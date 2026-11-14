import rawColumns from "./columns.json" with { type: "json" };
import { createEditor } from "../../core/editor.js";

let editorInstance = null;

export const actions = {
  create: ({ monaco }) => {
    editorInstance = createEditor({
      monaco,
      containerId: 'columnsEditor',
      value: JSON.stringify(rawColumns, null, 2),
      uri: 'inmemory://keshavsoft/columns.json'
    });
    return editorInstance;
  },
  getValue: () => {
    if (!editorInstance) return rawColumns;
    return JSON.parse(editorInstance.getValue());
  },
  reset: () => {
    if (editorInstance) {
      editorInstance.setValue(JSON.stringify(rawColumns, null, 2));
    }
  }
};
