const axios = require('axios');
const { AXIOS_CONFIG } = require('../../config/index');

module.exports = async () => {
  let response;
  try {
    // получить конфиг
    const response = await axios.get('/conf', AXIOS_CONFIG);

    global.config = { ...global.config, ...response.data.data }
  } catch (error) {
    console.log(error);
  }
};
