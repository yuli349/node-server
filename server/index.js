const { PORT } = require('./config/index.js');
const { apiRouter } = require('./routers');
const startWork = require('./controllers/builds/startWork');

const express = require('express');
const app = express();
app.use(express.json());
app.use(apiRouter);


const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      startWork();
    });
  }
  catch (e) {
  }
};

start();
