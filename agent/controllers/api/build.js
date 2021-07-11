const sendResultBuild = require('../server/sendResultBuild');

const build = require('../builds/build');

module.exports = async (req, res) => {
  try {
    const {body} = req;

    // console.log(body);

    build(body)
      .then(data => sendResultBuild(data));

    res.status(202).send('Added to build');

  } catch (error) {
    res.send(error);
  }
};
