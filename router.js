const { Router } = require('express');
const RootRouter = Router();

const userRouter = require('./router/user.router');

RootRouter.use('/', userRouter);

module.exports = RootRouter;    

