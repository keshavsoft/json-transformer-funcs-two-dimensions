import instructions from './instructions.json' with { type: 'json' };
import actions from './actions.js';

export async function initMonaco() {
  for (const item of instructions) {
    if (typeof actions[item.action] === 'function') {
      await actions[item.action]();
    }
  }
  return window.monaco;
}

export default initMonaco;
