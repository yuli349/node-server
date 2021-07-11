const axios = require('axios');
const {AXIOS_CONFIG} = require('../../config/index');

module.exports = async (result) => {
  try {
    await axios.post('/notify-build-result', {
      ...result
    }, AXIOS_CONFIG)
  } catch (error) {
    console.log('Не удалось передать данные на сервер, агент будет убит');
    process.exit();
  }
};