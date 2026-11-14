import { initMonaco } from './modules/monaco/index.js';
import { initEditor } from './modules/editor/index.js';
import { initFileSelector } from './modules/fileSelector/index.js';

async function boot() {
  try {
    const monaco = await initMonaco();
    initEditor(monaco);
    initFileSelector('app');

    console.info('[Monaco V4 Blueprint] Initialized successfully via window.ks.');
  } catch (error) {
    console.error('[Monaco V4 Blueprint Error]', error);
  }
}

boot();
