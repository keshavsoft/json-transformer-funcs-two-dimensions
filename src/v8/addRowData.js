const startFunc = (inColumns, inRowData) => {
    const createColumns = inColumns.map(column => {
        return {
            ...column,
            rowData: inRowData[column.columnName]
        };
    });

    return createColumns;
};

export default startFunc;
