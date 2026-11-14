import bindings from './bindings.json' with { type: 'json' };
import actions from './actions.js';

export function initFileSelector(containerOrId = 'app', { editor } = {}) {
  if (editor) {
    actions.setEditor(editor);
  }

  const bindEvents = window.ks?.domPrimitive?.bindings?.bindEvents || window.ks?.bindEvents;
  if (typeof bindEvents !== 'function') {
    throw new Error('window.ks.domPrimitive.bindings.bindEvents is not available.');
  }

  bindEvents(containerOrId, bindings, actions);
}

export default initFileSelector;
