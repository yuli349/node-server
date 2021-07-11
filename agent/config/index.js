const config = require('../agent-conf.json');

module.exports = {
  PORT: config.port,
  AXIOS_CONFIG: {
    baseURL: config.serverHost + ':' + config.serverPort,
  },
};
