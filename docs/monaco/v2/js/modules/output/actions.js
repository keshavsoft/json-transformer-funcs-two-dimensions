import { createEditor } from "../../core/editor.js";

let editorInstance = null;

export const actions = {
  create: ({ monaco }) => {
    editorInstance = createEditor({
      monaco,
      containerId: 'returnedEditor',
      value: '[]',
      uri: 'inmemory://keshavsoft/output.json',
      readOnly: true
    });
    return editorInstance;
  },
  setValue: (val) => {
    if (editorInstance) {
      const text = typeof val === 'string' ? val : JSON.stringify(val, null, 2);
      editorInstance.setValue(text);
    }
  },
  reset: () => {
    if (editorInstance) {
      editorInstance.setValue('[]');
    }
  }
};
