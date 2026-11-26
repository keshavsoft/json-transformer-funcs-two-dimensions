import { rowOnColumn } from "../../src/index.js";
import spec from "declarative-spec";

import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

// console.log("spec : ", spec);

const output = rowOnColumn({
    columns, data,
    columnSpec: spec["buildBodyCell"],
    rowSpec: spec["buildBodyTr"]
});

console.log("output : ", JSON.stringify(output, null, 2));
