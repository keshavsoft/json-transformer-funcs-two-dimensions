import rawData from "./data.json" with { type: "json" };
import { createEditor } from "../../core/editor.js";

let editorInstance = null;

export const actions = {
  create: ({ monaco }) => {
    editorInstance = createEditor({
      monaco,
      containerId: 'dataEditor',
      value: JSON.stringify(rawData, null, 2),
      uri: 'inmemory://keshavsoft/data.json'
    });
    return editorInstance;
  },
  getValue: () => {
    if (!editorInstance) return rawData;
    return JSON.parse(editorInstance.getValue());
  },
  reset: () => {
    if (editorInstance) {
      editorInstance.setValue(JSON.stringify(rawData, null, 2));
    }
  }
};
