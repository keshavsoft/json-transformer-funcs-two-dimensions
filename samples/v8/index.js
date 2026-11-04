import transformer from "../../src/index.js";
import { spec } from "spec-repo";

import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

// console.log("spec : ", spec);

const output = transformer({
    columns, data,
    columnSpec: spec["buildBodyCell"],
    rowSpec: spec["buildBodyTr"]
});

console.log("output : ", output[0].children);
