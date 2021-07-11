const { Router } = require('express');

const api = require('./controllers/api');

const apiRouter = new Router();

apiRouter.post('/build', api.build);

exports.apiRouter = apiRouter;
