import instructions from './instructions.json' with { type: 'json' };
import actions from './actions.js';

export function initEditor(monaco) {
  for (const item of instructions) {
    if (typeof actions[item.action] === 'function') {
      actions[item.action](monaco);
    }
  }
}

export default initEditor;
