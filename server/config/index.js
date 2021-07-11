const config = require('../server-conf.json');

module.exports = {
  PORT: config.port,
  AXIOS_CONFIG: {
    baseURL: config.apiBaseUrl,
    headers: {
      'Authorization': 'Bearer ' + config.apiToken,
    },
  },
};
