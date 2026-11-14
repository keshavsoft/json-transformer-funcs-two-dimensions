import spec from "./spec.json" with { type: "json" };
import { columnsActions } from "../columns/index.js";
import { dataActions } from "../data/index.js";
import { outputActions } from "../output/index.js";
import transformer from "../../../../../dist/v8/min.js";

function setStatus(text, success = true) {
  const statusEl = document.getElementById("intelligenceStatus");
  if (statusEl) {
    statusEl.textContent = text;
    statusEl.className = success ? "status active" : "status inactive";
  }
}

export const actions = {
  populateDropdowns: () => {
    const rowSelect = document.getElementById("rowSpecSelect");
    const colSelect = document.getElementById("columnSpecSelect");
    if (!rowSelect || !colSelect) return;

    rowSelect.innerHTML = "";
    colSelect.innerHTML = "";

    const keys = Object.keys(spec);
    for (const key of keys) {
      const optRow = document.createElement("option");
      optRow.value = key;
      optRow.textContent = key;
      if (key === "buildBodyTr") optRow.selected = true;
      rowSelect.appendChild(optRow);

      const optCol = document.createElement("option");
      optCol.value = key;
      optCol.textContent = key;
      if (key === "buildBodyCell") optCol.selected = true;
      colSelect.appendChild(optCol);
    }
    setStatus("Ready to transform");
  },

  transform: () => {
    try {
      const columns = columnsActions.getValue();
      const data = dataActions.getValue();

      const rowSelect = document.getElementById("rowSpecSelect");
      const colSelect = document.getElementById("columnSpecSelect");
      const rowKey = rowSelect ? rowSelect.value : "buildBodyTr";
      const colKey = colSelect ? colSelect.value : "buildBodyCell";

      const rowSpec = spec[rowKey];
      const columnSpec = spec[colKey];

      const result = transformer({
        columns,
        data,
        rowSpec,
        columnSpec
      });

      outputActions.setValue(result);
      setStatus(`Generated ${Array.isArray(result) ? result.length : 1} items (${rowKey} + ${colKey})`, true);
    } catch (error) {
      console.error("[Two-dimensional Transform Error]", error);
      setStatus(`Error: ${error.message}`, false);
    }
  },

  reset: () => {
    columnsActions.reset();
    dataActions.reset();
    outputActions.reset();
    actions.populateDropdowns();
    setStatus("Reset complete", true);
  }
};
