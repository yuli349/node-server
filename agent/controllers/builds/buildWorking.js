const { spawn } = require('child_process');
const {PORT} = require('../../config/index');
const cloneRepo = require('./clone');
const checkoutRepo = require('./checkout');
const { join } = require('path');

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
  
  console.log(cwd);
  
  const run = spawn(buildCommand, [], {cwd: cwd, shell: true});
  console.log('build command: ' + buildCommand);
  let stdout = '';
  let stderr = '';
  
  return new Promise(resolve => {
    const finishBuild = new Date();
    global.available = true;
    resolve({
      port: PORT,
      available: global.available,
      buildId: id,
      duration: Math.ceil(((finishBuild - startBuild) / 1000) / 60),
      success: true,
      buildLog: (stdout + stderr) || 'string'
    });
  });
  
  return new Promise(resolve => {
    console.log(stderr, stdout);
    run.stdout.on('data', data => {
      stdout += data;
      console.log(data.toString())
    });
    run.stderr.on('data', data => stderr += data);
    
    run.on('error', () => {
      console.log(stderr);
      const finishBuild = new Date();
      global.available = true;
      resolve({
        port: PORT,
        available: global.available,
        buildId: id,
        duration: Math.ceil(((finishBuild - startBuild) / 1000) / 60),
        success: false,
        buildLog: (stdout + stderr) || 'string'
      });
    });
    
    run.on('close', (status) => {
      const finishBuild = new Date();
      global.available = true;
      resolve({
        port: PORT,
        available: global.available,
        buildId: id,
        duration: Math.ceil(((finishBuild - startBuild) / 1000) / 60),
        success: status === 0,
        buildLog: (stdout + stderr) || 'string'
      });
    });
    
  });
};
