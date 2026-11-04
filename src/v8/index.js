import applyTemplate from "json-transformer-funcs-primitive";
import oneDimension from "json-transformer-funcs-one-dimension";

import addRowData from "./addRowData.js";
import guardFunc from "./guard/index.js";

const startFunc = ({ columns, data, columnSpec, rowSpec }) => {
    guardFunc(columns, data);

    const localColumns = columns;
    const localData = data;

    const createdArray = localData.map(rowElement => {
        const row = applyTemplate(rowElement, rowSpec);

        const alteredRowData = addRowData(localColumns, rowElement);
        const rowColumns = oneDimension(alteredRowData, columnSpec);

        row.children = rowColumns;

        return row;
    });

    return createdArray;
};

export default startFunc;