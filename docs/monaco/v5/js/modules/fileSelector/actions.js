export const actions = {
  loadFile: async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const editor = window.monaco?.editor?.getEditors()?.[0];
      if (editor) {
        editor.setValue(text);

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
