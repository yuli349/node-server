const {PORT} = require('../../config/index');
const cloneRepo = require('./clone');
const checkoutRepo = require('./checkout');
const { join } = require('path');
const Promise = require("bluebird");
const execAffffsync = Promise.promisify(require('child_process').exec, {multiArgs: true});

module.exports = async ({id, commitHash, repoName, buildCommand, mainBranch}) => {
  console.log(repoName);
  global.available = false;
  const startBuild = new Date();
  try {
    await cloneRepo({branchName: mainBranch, repoUrl: repoName});
    await checkoutRepo({commitHash});
  } catch (error) {
    console.log(error);
  }
  const repo = repoName.split('/');
  const cwd = join(__dirname, '../../', '/Jason', repo[repo.length - 1]);

  // console.log(cwd);

  // console.log('build command: ' + buildCommand);
  let stdout = '';
  let stderr = '';

  const buildDirConfig = {
    shell: true,
    cwd: cwd,
  };

  let success = false;
  let buildLog = '';
  try {
    buildLog = await execAffffsync(buildCommand, buildDirConfig);
    buildLog = buildLog[0];
    success = true;
  }
  catch (e) {
    buildLog = e.message;
    success = false;
  }

  return new Promise(resolve => {
    const finishBuild = new Date();
    global.available = true;
    resolve({
      port: PORT,
      available: global.available,
      buildId: id,
      duration: Math.ceil(((finishBuild - startBuild) / 1000) / 60),
      success: success,
      buildLog: buildLog
    });
  });

};
