import actions from './actions.js';

export function initEditor(monaco) {
  return actions.create(monaco);
}

export default initEditor;
