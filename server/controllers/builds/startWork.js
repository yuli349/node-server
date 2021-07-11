const axios = require('axios');
const getNewBuilds = require('./getNewBuilds');
const getConfig = require('./getConfig');
const {AXIOS_CONFIG} = require('../../config/index');

intervalTime = 10000;
global.builds = global.builds || [];
global.agents = global.agents || [];
global.config = global.config || {};

module.exports = async () => {
  getNewBuilds();
  getConfig();
  setInterval(async () => {
    if (global.builds.length !== 0 && global.agents.length !== 0) {
      for (const agent of global.agents) {
        if (agent.available && global.builds.length !== 0) {
          const {host, port} = agent;
          const {id, commitHash} = global.builds.pop();
          const {repoName, buildCommand, mainBranch} = global.config;
          let response;
          try {
            console.log(`Послал POST агенту ${host}:${port}`);
            response = await axios.post(`http://${host}:${port}/build`, {
              id,
              commitHash,
              repoName,
              buildCommand,
              mainBranch
            });
          } catch (error) {
            console.log(error);
          }
          console.log(response.status, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          if (response.status === 202) {
            console.log('Билд получен');
            agent.available = false; // чтобы ондому агенту не пульнуть 2 билда
            agent.buildId = id;

            // запрос в яндекс, что билд начался
            await axios.post('/build/start', {buildId: id, dateTime: new Date()}, AXIOS_CONFIG);
          }
        }
      }
    }
  }, intervalTime)
};
