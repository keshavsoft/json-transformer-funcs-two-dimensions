import transformer from "../../src/index.js";

import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const specUrl = "https://keshavsoft.github.io/json-to-tag/tags/spec.json";
const specResponse = await fetch(specUrl);

if (!specResponse.ok) {
    throw new Error(`Failed to load spec: ${specResponse.status} ${specResponse.statusText}`);
}

const spec = await specResponse.json();

const output = transformer(columns, data, spec);

console.log("output : ", output);
