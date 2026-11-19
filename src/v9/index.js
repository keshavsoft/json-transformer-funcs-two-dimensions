import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";

/**
 * Universal 2D Transformation Engine:
 * Maps an outer collection to containers (0D), and populates children with inner collection (1D).
 */
export const twoDimensional = ({ outer = [], outerSpec, getInner, innerSpec } = {}) => {
    return outer.map(outerItem => {
        const container = applyTemplate(outerItem, outerSpec);
        const innerItems = getInner ? getInner(outerItem) : [];
        container.children = innerItems.length > 0 ? fromCollection(innerItems, innerSpec) : [];
        return container;
    });
};

/**
 * Mode A: Table Body (Row-on-Column)
 * Outer = Data rows, applied with rowSpec (e.g. <tr>)
 * Inner = Columns, applied with columnSpec (e.g. <td>)
 */
export const rowOnColumn = ({ columns = [], data = [], columnSpec, rowSpec } = {}) => {
    const rows = Array.isArray(data) ? data : (data?.data ?? data?.rows ?? []);
    return twoDimensional({
        outer: rows,
        outerSpec: rowSpec,
        innerSpec: columnSpec,
        getInner: row => columns.map(col => ({
            ...col,
            rowValue: row[col.columnName]
        }))
    });
};

/**
 * Mode B: Dropdowns / Selects / DataLists (Column-on-Row)
 * Outer = Columns, applied with columnSpec (e.g. <select> or <datalist>)
 * Inner = Options/Rows, applied with rowSpec (e.g. <option>)
 */
export const columnOnRow = ({ columns = [], data = [], rows, columnSpec, rowSpec } = {}) => {
    const rowList = rows ?? (Array.isArray(data) ? data : (data?.data ?? data?.rows ?? []));
    return twoDimensional({
        outer: columns,
        outerSpec: columnSpec,
        innerSpec: rowSpec,
        getInner: col => {
            if (Array.isArray(col.options) && col.options.length > 0) {
                return col.options.map(opt => typeof opt === "object" ? opt : { rowValue: opt });
            }
            return rowList.map(r => ({
                ...r,
                rowValue: r[col.columnName] ?? r.value ?? r
            }));
        }
    });
};

/**
 * Default Dispatcher:
 * Supports explicit type / mode or standard params.
 */
const startFunc = (params = {}) => {
    if (params.type === "columnOnRow" || params.mode === "columnOnRow") {
        return columnOnRow(params);
    }
    if (params.outer && params.outerSpec) {
        return twoDimensional(params);
    }
    return rowOnColumn(params);
};

export default startFunc;
