# json-transformer-funcs-two-dimensions

> Columns x data rows = a grid of <tr> rows, each with their <td> cells.

[![npm](https://img.shields.io/npm/v/json-transformer-funcs-two-dimensions)](https://www.npmjs.com/package/json-transformer-funcs-two-dimensions)

---

## Install

```bash
npm install json-transformer-funcs-two-dimensions
```

---

## What it does

Takes a column schema, a data array, and a spec object.
For every data row it builds one `<tr>` element, then fills it with `<td>` cells — one per column.

Two steps happen per data row:

1. **Build the row container** — `applyTemplate(rowTemplate, rowElement)` creates the `<tr>`
2. **Build the cells** — each column's template key is looked up in `spec`, applied with `applyTemplate`, and the results become the `<tr>`'s `children`

The column schema drives both steps: `template.body.tr` names the row template, `template.body.cell` names the cell template.

---

## Signature

```javascript
import twoDimensional from "json-transformer-funcs-two-dimensions";

twoDimensional(inColumns, inData, inSpec)
```

| Argument | Type | Description |
| :--- | :--- | :--- |
| `inColumns` | non-empty array of column objects | Each must have `columnName` and optionally `template.body.tr` / `template.body.cell` |
| `inData` | array of row objects | One object per row; keys match `columnName` values |
| `inSpec` | plain object | The template library — keyed by template name |

**Returns:** an array of `<tr>` row nodes, each with `children` filled with `<td>` cell nodes.

**Guards (throw on violation):**
- `inColumns` must be a non-empty array; every item must have a non-empty `columnName`
- `inData` must be an array of objects
- `inSpec` must be a plain object
- The row template key **must exist** in `inSpec`
- Every cell template key **must exist** in `inSpec` — missing keys throw with the exact key name

---

## Example

```javascript
import twoDimensional from "json-transformer-funcs-two-dimensions";

const columns = [
    { columnName: "itemName", width: "300px", template: { body: { tr: "buildBodyTr", cell: "buildBodyCell" } } },
    { columnName: "baseUnit", width: "200px", template: { body: { tr: "buildBodyTr", cell: "buildBodyCell" } } },
    { columnName: "batches",  width: "100px", template: { body: { tr: "buildBodyTr", cell: "buttonCell"   } } }
];

const data = [
    { itemName: "0.09/30mm", baseUnit: "kgs", batches: [{ ... }] }
];

const spec = {
    buildBodyTr:   { tagName: "tr", attributes: { class: "align-middle" }, children: [] },
    buildBodyCell: { tagName: "td", textContent: "${rowValue}", attributes: { class: "py-3 px-3 text-secondary" } },
    buttonCell:    { tagName: "td", attributes: { class: "py-2 px-3 text-center" },
                     children: [{ tagName: "button", textContent: "${agg:count}", attributes: { class: "btn btn-primary btn-sm" } }] }
};

const rows = twoDimensional(columns, data, spec);
// [
//   {
//     tagName: "tr",
//     attributes: { class: "align-middle" },
//     children: [
//       { tagName: "td", textContent: "0.09/30mm", ... },
//       { tagName: "td", textContent: "kgs",       ... },
//       { tagName: "td", attributes: { class: "..." }, children: [{ tagName: "button", textContent: 1 }] }
//     ]
//   }
// ]
```

---

## When to use

Use `twoDimensional` when you have **a column schema and a data array** and want **a grid of row nodes** — each row filled with the correct cell per column.

For a flat list of elements from a flat source array, use
[`json-transformer-funcs-one-dimension`](https://www.npmjs.com/package/json-transformer-funcs-one-dimension).

For a single element from a single object, use
[`json-transformer-funcs-primitive`](https://www.npmjs.com/package/json-transformer-funcs-primitive).

For the complete story — all three engines working together with a registry, instructions, and writePath — see
[`json-transformer-funcs`](https://www.npmjs.com/package/json-transformer-funcs).

---

## License

MIT (c) KeshavSoft
