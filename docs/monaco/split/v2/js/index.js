import { initMonaco } from './modules/monaco/index.js';
import { initEditor } from './modules/editor/index.js';
import { initFileSelector } from './modules/fileSelector/index.js';

async function boot() {
  try {
    const monaco = await initMonaco();

    const leftEditor = initEditor(monaco, {
      containerId: 'monacoLeft',
      initialValue: {
        title: "Monaco Split Blueprint — Left",
        role: "Source",
        message: "Load a JSON file via the top bar file picker."
      }
    });

    const rightEditor = initEditor(monaco, {
      containerId: 'monacoRight',
      initialValue: {
        title: "Monaco Split Blueprint — Right",
        role: "Target",
        message: "Transformed two-dimension results will appear here."
      }
    });

    initFileSelector('app', { editor: leftEditor });

    console.info('[Monaco Split V1] Successfully booted 50/50 split editors.');
  } catch (error) {
    console.error('[Monaco Split V1 Error]', error);
  }
}

boot();
