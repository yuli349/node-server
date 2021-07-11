const axios = require('axios');
const { AXIOS_CONFIG } = require('../../config/index');
const getConfig = require('./getConfig');

const BUILD_INT = 10 * 1000;

getBuilds = async () => {
  try {

    // получить билды
    const response = await axios.get(`/build/list`, AXIOS_CONFIG);

    global.builds = response.data.data;
    global.builds = global.builds.filter(({ status }) => status === 'Waiting');
    // console.log(global.builds);

  } catch (error) {
    console.log(error);
  }
};

module.exports = async () => {
  getBuilds();
  setInterval(() => {
    if (global.builds.length === 0) {
      getConfig();
      console.log('Запрос за новыми билдами каждые ', BUILD_INT, ' мс');
      getBuilds();
    }
  }, BUILD_INT)
};
