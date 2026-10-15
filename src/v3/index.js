import applyTemplate from "json-transformer-funcs-primitive";
import addRowData from "./addRowData.js";
import guardFunc from "./guard/index.js";

const buildCells = (inRowColumns, inSpec) => {
    return inRowColumns.map(column => {
        const cellTemplateKey = column.template?.body?.cell || column.template?.bodyCell || "buildBodyCell";
        const cellTemplate = inSpec[cellTemplateKey];
        return applyTemplate(cellTemplate, column);
    });
};

const buildRow = (inRowElement, inColumns, inSpec, inRowTemplate) => {
    const row = applyTemplate(inRowTemplate, inRowElement);
    const rowColumns = addRowData(inColumns, inRowElement);
    row.children = buildCells(rowColumns, inSpec);
    return row;
};

const startFunc = (inColumns, inData, inSpec) => {
    guardFunc(inColumns, inData, inSpec);

    const localColumns = inColumns;
    const localData = inData;
    const localSpec = inSpec;

    const rowKey = localColumns[0]?.template?.body?.tr || "buildBodyTr";
    const rowTemplate = localSpec[rowKey];

    return localData.map(rowElement => {
        return buildRow(rowElement, localColumns, localSpec, rowTemplate);
    });
};

export default startFunc;
export { buildCells, buildRow };
