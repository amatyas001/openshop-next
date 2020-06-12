import 'cypress-dotenv';
export default (on, config) => {
  config = dotenvPlugin(config, { path: '/.env.local' }, true);
  return config;
};
