import { initMonaco } from './modules/monaco/index.js';
import { initEditor } from './modules/editor/index.js';
import { initFileSelector } from './modules/fileSelector/index.js';

async function boot() {
  try {
    const monaco = await initMonaco();
    const editor = initEditor(monaco);
    initFileSelector('app', { editor });

    console.info('[Monaco V6 Blueprint] Initialized with modular CSS and decoupled editor reference.');
  } catch (error) {
    console.error('[Monaco V6 Blueprint Error]', error);
  }
}

boot();
