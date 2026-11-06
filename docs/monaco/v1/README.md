# Two-dimensional Monaco Playground (V9)

This page is copied from the highest Monaco documentation version (V9) in the
one-dimensional repository and adapted for the two-dimensional transformer.

## Inputs

- `base.json`: HTML table skeleton, including the header and an empty `tbody#tableBody`.
- `columns.json`: column names and widths.
- `data.json`: source records.
- `columnSpec.json`: one shared `td` template for every generated cell.
- `rowSpec.json`: one shared `tr` template for every generated row.
- `output.json`: generated row JSON.

## Workflow

1. Open `docs/v9/index.html` through a local web server.
2. Click **render base** to render the table skeleton.
3. Edit the four transformation inputs if needed.
4. Click **build 2D**. The page calls the two-dimensional V8 package with
   `{ columns, data, columnSpec, rowSpec }`, displays the generated JSON, and
   inserts the generated rows into `#tableBody`.

The playground does not directly call the one-dimensional transformer. The
two-dimensional package internally delegates cell generation to its own
one-dimensional dependency.

## Verification

The V8 transformer was executed locally against the supplied sample inputs.
It returned one `tr` row containing three `td` cells, and the first cell
contained `0.09/30mm`.
