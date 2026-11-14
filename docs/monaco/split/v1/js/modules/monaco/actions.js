import config from './config.json' with { type: 'json' };

export const actions = {
  load: () => new Promise((resolve, reject) => {
    if (window.monaco?.editor) return resolve(window.monaco);
    if (!window.require) return reject(new Error('Monaco AMD loader is missing.'));
    window.require.config({ paths: config.paths });
    window.require(config.modules, () => {
      if (window.monaco?.editor) resolve(window.monaco);
      else reject(new Error('Monaco API unavailable.'));
    }, reject);
  })
};

export default actions;
