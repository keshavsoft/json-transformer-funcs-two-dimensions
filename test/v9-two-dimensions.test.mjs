import test from "node:test";
import assert from "node:assert/strict";
import twoDimensional, { rowOnColumn, columnOnRow } from "../src/index.js";
import { spec } from "spec-repo";

const columns = [
    { columnName: "itemName", label: "Item Name", type: "text", width: "260px" },
    { columnName: "category", label: "Category", type: "select", width: "180px", options: ["Fasteners", "Raw Materials", "Extrusions"] },
    { columnName: "baseUnit", label: "Base Unit", type: "text", width: "120px" }
];

const data = [
    { itemName: "M6 Hex Bolt", category: "Fasteners", baseUnit: "pcs" },
    { itemName: "Alloy Sheet 2mm", category: "Raw Materials", baseUnit: "sqm" }
];

test("v9 rowOnColumn generates table rows with cells correctly", () => {
    const result = rowOnColumn({
        columns,
        data,
        columnSpec: spec.buildBodyCell,
        rowSpec: spec.buildBodyTr
    });

    assert.equal(result.length, 2);
    assert.equal(result[0].tagName, "tr");
    assert.equal(result[0].children.length, 3);
    assert.equal(result[0].children[0].textContent, "M6 Hex Bolt");
    assert.equal(result[0].children[1].textContent, "Fasteners");
    assert.equal(result[0].children[2].textContent, "pcs");

    assert.equal(result[1].children[0].textContent, "Alloy Sheet 2mm");
    assert.equal(result[1].children[1].textContent, "Raw Materials");
    assert.equal(result[1].children[2].textContent, "sqm");
});

test("v9 columnOnRow generates selects with option children from column.options", () => {
    const result = columnOnRow({
        columns,
        columnSpec: spec.buildSelect,
        rowSpec: spec.buildOption
    });

    assert.equal(result.length, 3);
    assert.equal(result[0].tagName, "select");
    assert.equal(result[0].attributes.id, "itemName");
    assert.equal(result[0].children.length, 0); // No options on itemName

    // Category has 3 options
    assert.equal(result[1].attributes.id, "category");
    assert.equal(result[1].children.length, 3);
    assert.equal(result[1].children[0].tagName, "option");
    assert.equal(result[1].children[0].textContent, "Fasteners");
    assert.equal(result[1].children[1].textContent, "Raw Materials");
    assert.equal(result[1].children[2].textContent, "Extrusions");
});

test("v9 columnOnRow falls back to data rows when column.options not present", () => {
    const result = columnOnRow({
        columns,
        data,
        columnSpec: spec.buildDataList,
        rowSpec: spec.buildOption
    });

    assert.equal(result.length, 3);
    // itemName gets options from data rows
    assert.equal(result[0].children.length, 2);
    assert.equal(result[0].children[0].textContent, "M6 Hex Bolt");
    assert.equal(result[0].children[1].textContent, "Alloy Sheet 2mm");

    // category uses its own column.options (3 items)
    assert.equal(result[1].children.length, 3);
    assert.equal(result[1].children[0].textContent, "Fasteners");

    // baseUnit gets options from data rows
    assert.equal(result[2].children.length, 2);
    assert.equal(result[2].children[0].textContent, "pcs");
    assert.equal(result[2].children[1].textContent, "sqm");
});

test("v9 default export dispatches rowOnColumn and columnOnRow via type/mode", () => {
    const tableResult = twoDimensional({
        columns,
        data,
        columnSpec: spec.buildBodyCell,
        rowSpec: spec.buildBodyTr
    });
    assert.equal(tableResult.length, 2);
    assert.equal(tableResult[0].tagName, "tr");

    const selectResult = twoDimensional({
        columns,
        type: "columnOnRow",
        columnSpec: spec.buildSelect,
        rowSpec: spec.buildOption
    });
    assert.equal(selectResult.length, 3);
    assert.equal(selectResult[0].tagName, "select");
});
