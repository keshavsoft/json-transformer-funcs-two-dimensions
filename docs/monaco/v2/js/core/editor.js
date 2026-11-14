const defaultEditorOptions = {
  language: 'json',
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  tabSize: 2,
  scrollBeyondLastLine: false,
  formatOnPaste: true,
  formatOnType: true
};

export function createEditor({ monaco, containerId, value, uri, readOnly = false }) {
  const model = monaco.editor.createModel(value, 'json', monaco.Uri.parse(uri));
  return monaco.editor.create(document.getElementById(containerId), {
    ...defaultEditorOptions,
    model,
    readOnly
  });
}
