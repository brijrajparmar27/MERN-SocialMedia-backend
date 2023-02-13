const { Router } = require("express");
const userRouter = Router();
const { Signup, SignIn, getAllUser } = require("../controller/userController");
const authenticateJWT = require('../middleware/userAuth')

userRouter.post("/signup", Signup);
userRouter.post("/login", SignIn);
userRouter.get('/get-alluser', authenticateJWT, getAllUser)


module.exports = userRouter;
