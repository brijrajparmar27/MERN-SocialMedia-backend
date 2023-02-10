const { Router } = require('express');
const userRouter = Router();
const { Signup, SignIn } = require('../controller/userController')




userRouter.post('/singUp', Signup );
userRouter.post('/login', SignIn)

module.exports = userRouter;