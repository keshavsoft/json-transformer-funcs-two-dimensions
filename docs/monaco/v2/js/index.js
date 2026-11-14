import { initMonaco } from './modules/monaco/index.js';
import { initColumns } from './modules/columns/index.js';
import { initData } from './modules/data/index.js';
import { initOutput } from './modules/output/index.js';
import { initControls } from './modules/controls/index.js';

async function boot() {
  const context = {};
  try {
    debugger;
    // 1. Initialize Monaco AMD environment
    await initMonaco(context);

    // 2. Initialize the 3 independent editors in their own pipelines
    await initColumns(context);
    await initData(context);
    await initOutput(context);

    // 3. Initialize controls (dropdowns from spec + transform button)
    await initControls(context);

    console.info('[Two-Dimensional Playground V2] All modules initialized.');
  } catch (error) {
    console.error('[Two-Dimensional Playground V2]', error);
    const status = document.getElementById('intelligenceStatus');
    const message = document.getElementById('message');
    if (status) { status.textContent = 'Unable to start'; status.className = 'status inactive'; }
    if (message) message.textContent = error.message;
  }
}

boot();
