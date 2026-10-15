# json-transformer-funcs-two-dimensions

Two-dimensional matrix grid mapper for `json-transformer-funcs`.

Maps a 2D grid (`columns` $\times$ `rows` data) across templates to produce full table row structures (`<tr>[<td>, <td>]</tr>`). Supports heterogeneous cell templates specified per column (such as standard text cells and aggregate button cells).

## Installation

```bash
npm install json-transformer-funcs-two-dimensions
```

## Usage

```javascript
import twoDimensional from "json-transformer-funcs-two-dimensions";

const columns = [
    {
        columnName: "name",
        template: {
            body: {
                tr: "buildBodyTr",
                cell: "buildBodyCell"
            }
        }
    },
    {
        columnName: "items",
        template: {
            body: {
                tr: "buildBodyTr",
                cell: "buttonCell"
            }
        }
    }
];

const data = [
    { name: "Order #1", items: [{ id: 101 }, { id: 102 }] }
];

const spec = {
    buildBodyTr: { tagName: "tr", attributes: { class: "row" }, children: [] },
    buildBodyCell: { tagName: "td", textContent: "${rowValue}" },
    buttonCell: {
        tagName: "td",
        children: [
            { tagName: "button", textContent: "${agg:count}" }
        ]
    }
};

const rows = twoDimensional(columns, data, spec);
console.log(rows);
```

## License

MIT
