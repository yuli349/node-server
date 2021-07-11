const { Router } = require('express');

const api = require('./controllers/api');

const apiRouter = new Router();

apiRouter.post('/notify-agent', api.notifyAgent);
apiRouter.post('/notify-build-result', api.notifyResultBuild);

exports.apiRouter = apiRouter;
