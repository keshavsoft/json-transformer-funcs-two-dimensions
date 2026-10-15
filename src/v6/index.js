import applyTemplate from "json-transformer-funcs-primitive";
import addRowData from "./addRowData.js";
import guardFunc from "./guard/index.js";

const buildCells = (inRowColumns, inSpec) => {
    const createdArray = inRowColumns.map(column => {
        const cellTemplateKey = column.template?.body?.cell || column.template?.bodyCell || "buildBodyCell";
        const cellTemplate = inSpec[cellTemplateKey];

        // console.log("cellTemplate : ", cellTemplate, column);

        const createdControl = applyTemplate(column, cellTemplate);

        // console.log("createdControl : ", createdControl);


        return createdControl;
    });

    return createdArray;
};

const startFunc = (inColumns, inData, inSpec) => {
    guardFunc(inColumns, inData, inSpec);

    const localColumns = inColumns;
    const localData = inData;
    const localSpec = inSpec;

    const rowKey = localColumns[0]?.template?.body?.tr || "buildBodyTr";
    const rowTemplate = localSpec[rowKey];

    const createdArray = localData.map(rowElement => {
        const row = applyTemplate(rowElement, rowTemplate);

        const rowColumns = addRowData(localColumns, rowElement);
        // console.log("2222222 : ", rowTemplate, row, rowColumns, localSpec);

        const children = buildCells(rowColumns, localSpec);

        // console.log("33333 : ", children);

        row.children = children;

        return row;
    });

    return createdArray;
};

export default startFunc;
export { buildCells };
