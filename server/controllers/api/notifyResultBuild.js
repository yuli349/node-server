const axios = require('axios');
const { AXIOS_CONFIG } = require('../../config/index');

module.exports = async (req, res) => {
  try {
  
    const { body } = req;
    
    console.log('закончился билд');
    console.log(body);
    // пульнуть запрос в яндекс о том, что билд закончился
    await axios.post('/build/finish', body, AXIOS_CONFIG);
  
    global.agents.forEach(agent => {
      if (Number(agent.port) === Number(body.port) && agent.host === req.hostname) {
        // освобождаем агента
        agent.available = true;
        delete (agent.buildId);
      }
    });
    res.status(200).send('ok');
    
  } catch (error) {
    res.send(error);
  }
};
