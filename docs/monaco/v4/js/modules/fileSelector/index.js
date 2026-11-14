import { bindEvents } from '../../core/dom-primitive-bindings.js';
import bindings from './bindings.json' with { type: 'json' };
import actions from './actions.js';

export function initFileSelector(containerOrId = 'app') {
  bindEvents(containerOrId, bindings, actions);
}

export default initFileSelector;
