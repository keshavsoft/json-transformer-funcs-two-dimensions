import transformer from "../../src/index.js";

import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import spec from "https://keshavsoft.github.io/json-to-tag/tags/spec.json";

const output = transformer(columns, data, spec);

console.log("output : ", output);
