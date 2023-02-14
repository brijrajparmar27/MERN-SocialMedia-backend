const { Router } = require("express");
const RootRouter = Router();

const userRouter = require("./router/user.router");
const fileRouter = require("./router/file.router");

RootRouter.use("/", userRouter);
RootRouter.use("/files", fileRouter);

module.exports = RootRouter;
