const { spawn } = require('child_process');
const { join } = require('path');

module.exports = ({ commitHash }) => {
  const cwd = join(__dirname, '../../', '/Jason');
  
  const git = spawn('git', ['checkout', '-q', commitHash], { cwd });
  return new Promise(((resolve, reject) => {
    git.on('error', err => reject({
      err: 'ERR_CHECKOUT_REPO',
      errMsg: err.toString(),
    }));
    git.on('close', () => resolve());
  }));
};
