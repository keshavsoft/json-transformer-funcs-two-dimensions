import actions from './actions.js';

export function initEditor(monaco, overrides = {}) {
  return actions.create(monaco, overrides);
}

export default initEditor;
