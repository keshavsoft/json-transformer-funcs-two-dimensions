import { models, activateTab, editor } from "../monacoEditor/index.js";
import twoDimension from "https://keshavsoft.github.io/json-transformer-funcs-two-dimensions/dist/v8/min.js";

function updateTargetDropdown() {
    const stage = document.getElementById("renderOutput");
    const select = document.getElementById("targetSelect");
    if (!stage || !select) return;

    const previous = select.value || "tableBody";
    const ids = new Map();
    stage.querySelectorAll("[id]").forEach((node) => ids.set(node.id, node.tagName.toLowerCase()));

    select.innerHTML = "";
    for (const [id, tag] of ids) {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = `#${id} (${tag})`;
        select.appendChild(option);
    }
    select.value = ids.has(previous) ? previous : (ids.has("tableBody") ? "tableBody" : "renderOutput");
}

function renderJsonSpec(jsonSpec, targetHtmlId, appendPosition = "replace") {
    const renderer = window.ks?.jsonToDom;
    if (!renderer?.appendToDom) {
        throw new Error("JSON-to-DOM renderer is not available. Check the json-to-dom script.");
    }
    renderer.appendToDom({
        jsonSpec,
        targetHtmlId,
        appendPosition,
        showLog: false
    });
}

function parseModel(model, label) {
    try {
        return JSON.parse(model.getValue());
    } catch (error) {
        throw new Error(`${label} contains invalid JSON: ${error.message}`);
    }
}

function showError(error) {
    const stage = document.getElementById("renderOutput");
    if (stage) {
        stage.innerHTML = `<div class="alert alert-danger font-monospace small" role="alert">
            <strong>Playground error:</strong><div class="mt-1"></div></div>`;
        stage.querySelector(".mt-1").textContent = error.message;
    }
    console.error(error);
}

export const actions = {
    renderBase: () => {
        try {
            const base = parseModel(models.base, "base.json");
            renderJsonSpec(base, "renderOutput", "replace");
            updateTargetDropdown();
            const select = document.getElementById("targetSelect");
            if (select && [...select.options].some(option => option.value === "tableBody")) {
                select.value = "tableBody";
            }
        } catch (error) {
            showError(error);
        }
    },

    build: () => {
        try {
            const columns = parseModel(models.columns, "columns.json");
            const data = parseModel(models.data, "data.json");
            const columnSpec = parseModel(models.columnSpec, "columnSpec.json");
            const rowSpec = parseModel(models.rowSpec, "rowSpec.json");

            // The playground calls only the two-dimensional package.
            const rows = twoDimension({ columns, data, columnSpec, rowSpec });
            if (!Array.isArray(rows)) {
                throw new Error("The two-dimensional transformer did not return an array of rows.");
            }

            models.output.setValue(JSON.stringify(rows, null, 2));
            activateTab("tabOutput", models.output);

            const targetSelect = document.getElementById("targetSelect");
            const targetHtmlId = targetSelect?.value || "tableBody";
            renderJsonSpec(rows, targetHtmlId, "replace");
            updateTargetDropdown();
        } catch (error) {
            showError(error);
        }
    },

    showTabBase: () => activateTab("tabBase", models.base),
    showTabColumns: () => activateTab("tabColumns", models.columns),
    showTabData: () => activateTab("tabData", models.data),
    showTabColumnSpec: () => activateTab("tabColumnSpec", models.columnSpec),
    showTabRowSpec: () => activateTab("tabRowSpec", models.rowSpec),
    showTabOutput: () => activateTab("tabOutput", models.output)
};

export default actions;
