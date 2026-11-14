let targetEditor = null;

export const actions = {
  setEditor: (editor) => {
    targetEditor = editor;
  },
  loadFile: async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      if (targetEditor) {
        targetEditor.setValue(text);

        const footer = document.getElementById('footerInfo');
        if (footer) footer.textContent = `File: ${file.name} (${file.size} bytes)`;

        const status = document.getElementById('fileStatus');
        if (status) {
          status.textContent = `Loaded: ${file.name}`;
          status.className = 'status active';
        }
      }
    } catch (err) {
      console.error('File load failed:', err);
      const status = document.getElementById('fileStatus');
      if (status) {
        status.textContent = 'Failed to load file';
        status.className = 'status inactive';
      }
    }
  }
};

export default actions;
