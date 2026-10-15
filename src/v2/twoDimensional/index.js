import applyTemplate from "json-transformer-funcs-primitive";

const addRowData = (inColumns, inRowData) => {
    return inColumns.map(column => {
        return {
            ...column,
            rowData: inRowData[column.columnName]
        };
    });
};

const startFunc = (inColumns, inData, inSpec) => {
    const localColumns = inColumns;
    const localData = inData;
    const localSpec = inSpec;
    const rowKey = localColumns[0]?.template?.body?.tr || "buildBodyTr";
    const rowTemplate = localSpec[rowKey];

    const builtCollectionInsideArray = localData.map(rowElement => {
        const row = applyTemplate(rowTemplate, rowElement);
        const rowColumns = addRowData(localColumns, rowElement);

        const cells = rowColumns.map(column => {
            const cellTemplateKey = column.template?.body?.cell || column.template?.bodyCell || "buildBodyCell";
            const cellTemplate = localSpec[cellTemplateKey];
            return applyTemplate(cellTemplate, column);
        });

        row.children = cells;
        return row;
    });

    return builtCollectionInsideArray;
};

export default startFunc;
export { addRowData };