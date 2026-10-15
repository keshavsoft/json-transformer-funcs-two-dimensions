const startFunc = (inColumns, inRowData) => {
    return inColumns.map(column => {
        return {
            ...column,
            rowData: inRowData[column.columnName]
        };
    });
};

export default startFunc;