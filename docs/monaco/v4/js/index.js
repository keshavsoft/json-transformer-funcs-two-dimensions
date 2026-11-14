import { initMonaco } from './modules/monaco/index.js';
import { initEditor } from './modules/editor/index.js';
import { initFileSelector } from './modules/fileSelector/index.js';

async function boot() {
  try {
    const monaco = await initMonaco();
    initEditor(monaco);
    initFileSelector('app');

    console.info('[Monaco V3 Blueprint] Pure JSON-driven modules initialized.');
  } catch (error) {
    console.error('[Monaco V3 Blueprint Error]', error);
  }
}

boot();
