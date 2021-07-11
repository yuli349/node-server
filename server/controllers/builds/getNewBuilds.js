const axios = require('axios');
const { AXIOS_CONFIG } = require('../../config/index');
const getConfig = require('./getConfig');

intervalTime = 10000;

getBuilds = async () => {
  let response;
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
      console.log('Запрос за новыми билдами', intervalTime);
      getBuilds();
    }
  }, intervalTime)
};
