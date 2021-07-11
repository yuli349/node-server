const {spawn, exec} = require('child_process');
const fs = require('fs');
const {promisify} = require('util');
const execAsync = promisify(exec);
const fileExistsAsync = promisify(fs.exists);
const mkDirAsync = promisify(fs.mkdir);
const {join} = require('path');

removeRepo = (path) => {
  return new Promise(async (resolve, reject) => {
    try {
      /// пришлось заменить на rmdir под винду
      //await execAsync(`rm -rf ${path}`);
      await execAsync(`rmdir /Q /S ${path}`);
      resolve('deleted');
    } catch (err) {
      reject(err)
    }
  });
};

module.exports = async ({branchName, repoUrl}) => {
  const cwd = join(__dirname, '../../', '/Jason');

  if (await fileExistsAsync(cwd)) {
    await removeRepo(cwd);
    await mkDirAsync(cwd);
  } else {
    await mkDirAsync(cwd);
  }
  // console.log(["clone", '-b', branchName, repoUrl]);
  const git = spawn("git", ["clone", '-b', branchName, repoUrl], {cwd});
  return new Promise(((resolve, reject) => {
    git.on('error', err => reject({
      err: 'ERR_CLONE_REPO',
      errMsg: err.toString(),
    }));
    git.on('close', () => resolve());
  }));
};
