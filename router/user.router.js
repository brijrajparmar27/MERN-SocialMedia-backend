const { Router } = require("express");
const userRouter = Router();
const { Signup, SignIn } = require("../controller/userController");

userRouter.post("/signup", Signup);
userRouter.post("/login", SignIn);

module.exports = userRouter;
