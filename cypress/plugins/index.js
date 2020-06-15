const dotenvPlugin = require('cypress-dotenv');
module.exports = (on, config) => {
  config = dotenvPlugin(config, { path: '/.env.local' }, true);
  return config;
};
