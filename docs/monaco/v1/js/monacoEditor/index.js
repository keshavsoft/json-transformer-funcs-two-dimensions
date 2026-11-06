let editor = null;

const models = {
    base: null,
    columns: null,
    data: null,
    columnSpec: null,
    rowSpec: null,
    output: null
};

function loadMonaco() {
    return new Promise((resolve, reject) => {
        if (window.monaco && window.monaco.editor) {
            resolve(window.monaco);
            return;
        }
        require.config({
            paths: {
                vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs"
            }
        });
        require(["vs/editor/editor.main"], () => resolve(window.monaco), reject);
    });
}

function activateTab(tabId, model) {
    if (editor && model) editor.setModel(model);
    const tabIds = ["tabBase", "tabColumns", "tabData", "tabColumnSpec", "tabRowSpec", "tabOutput"];
    for (const id of tabIds) {
        const element = document.getElementById(id);
        if (element) element.classList.toggle("active", id === tabId);
    }
}

async function readJsonFile(filename) {
    const response = await fetch(`./${filename}`);
    if (!response.ok) throw new Error(`Unable to load ${filename}: ${response.status}`);
    return JSON.stringify(await response.json(), null, 2) + "\n";
}

async function initMonaco() {
    const monaco = await loadMonaco();
    const [base, columns, data, columnSpec, rowSpec, output] = await Promise.all([
        readJsonFile("base.json"),
        readJsonFile("columns.json"),
        readJsonFile("data.json"),
        readJsonFile("columnSpec.json"),
        readJsonFile("rowSpec.json"),
        readJsonFile("output.json")
    ]);

    models.base = monaco.editor.createModel(base, "json");
    models.columns = monaco.editor.createModel(columns, "json");
    models.data = monaco.editor.createModel(data, "json");
    models.columnSpec = monaco.editor.createModel(columnSpec, "json");
    models.rowSpec = monaco.editor.createModel(rowSpec, "json");
    models.output = monaco.editor.createModel(output, "json");

    editor = monaco.editor.create(document.getElementById("jsonEditor"), {
        theme: "vs-dark",
        model: models.base,
        automaticLayout: true,
        tabSize: 2,
        fontSize: 13,
        minimap: { enabled: false },
        scrollBeyondLastLine: false
    });
    return editor;
}

export default initMonaco;
export { initMonaco, editor, models, activateTab };
