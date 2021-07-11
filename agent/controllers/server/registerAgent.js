const axios = require('axios');
const {PORT, AXIOS_CONFIG} = require('../../config/index');

global.available = global.available || true;

module.exports = async (req, res) => {
  try {
    try {
      console.log({port: Number(PORT), available: true});
      console.log(AXIOS_CONFIG);
      //регистрируем агента
      await axios.post('/notify_agent', {port: Number(PORT), available: global.available}, AXIOS_CONFIG);

    } catch (error) {
      console.log(error);
      console.log('Ошибка регистрации на сервере');
      process.exit(1);
    }

  } catch (error) {
    res.send(error);
  }
};
