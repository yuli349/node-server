const axios = require('axios');
const {AXIOS_CONFIG} = require('../../config/index');

const RETRY_INT = 10 * 1000;
async function notifyBuildResult(result) {
  try {
    await axios.post('/notify_build_result', {
      ...result
    }, AXIOS_CONFIG)
  } catch (error) {
    console.error(`Ошибка уведомления сервера, повторить через ${RETRY_INT}мс`, result, error);
    setTimeout(() => notifyBuildResult(result), RETRY_INT);
    process.exit();
  }
};

module.exports = notifyBuildResult;
