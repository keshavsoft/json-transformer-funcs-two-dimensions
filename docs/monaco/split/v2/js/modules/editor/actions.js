import baseConfig from './config.json' with { type: 'json' };

export const actions = {
  create: (monaco = window.monaco, overrides = {}) => {
    const config = { ...baseConfig, ...overrides };
    const container = document.getElementById(config.containerId);
    if (!container) throw new Error(`Container #${config.containerId} not found.`);

    const initialText = typeof config.initialValue === 'string'
      ? config.initialValue
      : JSON.stringify(config.initialValue, null, 2);

    const uriString = config.modelUri || `inmemory://keshavsoft/split/${config.containerId}.json`;
    const model = monaco.editor.createModel(
      initialText,
      config.language || 'json',
      monaco.Uri.parse(uriString)
    );

    return monaco.editor.create(container, {
      ...config,
      model
    });
  }
};

export default actions;
