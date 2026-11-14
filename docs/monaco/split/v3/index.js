import { initMonaco } from './editors/common/js/monacoLoader.js';
import { initLeftEditor } from './editors/left/js/index.js';
import { initRightEditor } from './editors/right/js/index.js';
import { initFileSelector } from './topbar/js/fileSelector/index.js';

async function boot() {
  try {
    const monaco = await initMonaco();

    const leftEditor = initLeftEditor(monaco);
    const rightEditor = initRightEditor(monaco);

    initFileSelector('app', { editor: leftEditor });

    console.info('[Monaco Split V2] Sibling feature-driven modules booted successfully.');
  } catch (error) {
    console.error('[Monaco Split V2 Error]', error);
  }
}

boot();
