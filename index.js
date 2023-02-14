require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
const RootRouter = require("./router");
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(RootRouter);

mongoose.connect(process.env.MONGO).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Your server is running on ${process.env.PORT}`);
  });
});
