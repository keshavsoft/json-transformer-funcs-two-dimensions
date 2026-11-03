import applyTemplate from "json-transformer-funcs-primitive";
import addRowData from "./addRowData.js";
import guardFunc from "./guard/index.js";

const buildCells = ({ inRowColumns, inSpec }) => {
    const createdArray = inRowColumns.map(column => {
        const cellTemplate = inSpec;
        const createdControl = applyTemplate(column, cellTemplate);

        return createdControl;
    });

    return createdArray;
};

const startFunc = ({ columns, data, columnSpec, rowSpec }) => {
    guardFunc(columns, data);

    const localColumns = columns;
    const localData = data;

    const createdArray = localData.map(rowElement => {
        const row = applyTemplate(rowElement, rowSpec);

        const rowColumns = addRowData(localColumns, rowElement);
        const children = buildCells({
            inRowColumns: rowColumns,
            inSpec: columnSpec
        });

        row.children = children;

        return row;
    });

    return createdArray;
};

export default startFunc;
export { buildCells };
