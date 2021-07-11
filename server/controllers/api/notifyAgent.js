global.agents = global.agents || [];

module.exports = async (req, res) => {
  try {
    const {body} = req;
    const {port} = body;
    // console.log(req.hostname === undefined || port === undefined);
    if (req.hostname === undefined || port === undefined) {
      return res.status(500).send('bad request');
    }

    if (global.agents.every(agent => agent.port !== body.port)) {
      global.agents.push({...body, host: req.hostname});
      res.status(200).send('ok');
      console.log(global.agents);
    }
    else {
      res.status(409).send('agent is already registered');
    }

  } catch (error) {
    res.send(error);
  }
};
