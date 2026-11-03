const guardFunc = (inColumns, inData) => {
    // 1. inColumns validation
    if (!Array.isArray(inColumns)) {
        throw new TypeError("inColumns must be an Array");
    }
    if (inColumns.length === 0) {
        throw new Error("inColumns cannot be empty");
    }
    for (let i = 0; i < inColumns.length; i++) {
        const col = inColumns[i];
        if (!col || typeof col !== "object") {
            throw new TypeError(`inColumns[${i}] must be an object`);
        }
        if (typeof col.columnName !== "string" || !col.columnName.trim()) {
            throw new TypeError(`inColumns[${i}].columnName must be a non-empty string`);
        }
    }

    // 2. inData validation
    if (!Array.isArray(inData)) {
        throw new TypeError("inData must be an Array");
    }
    for (let i = 0; i < inData.length; i++) {
        const row = inData[i];
        if (!row || typeof row !== "object") {
            throw new TypeError(`inData[${i}] must be an object`);
        }
    };

    return true;
};

export default guardFunc;
