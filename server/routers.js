const { Router } = require('express');

const api = require('./controllers/api');

const apiRouter = new Router();

apiRouter.post('/notify_agent', api.notifyAgent);
apiRouter.post('/notify_build_result', api.notifyResultBuild);

exports.apiRouter = apiRouter;
