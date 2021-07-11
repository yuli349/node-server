const { PORT } = require('./config/index.js');
const { apiRouter } = require('./routers');
const express = require('express');
const registerAgent = require('./controllers/server/registerAgent');
const app = express();
app.use(express.json());
app.use(apiRouter);


const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`Agent started on port ${PORT}`);
      registerAgent();
    });
  }
  catch (e) {
  }
};

start();
