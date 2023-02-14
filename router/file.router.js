const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    console.log(path.extname(file.originalname));
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send({ msg: "get images" });
});
router.post("/", upload.single("image"), (req, res) => {
  res.send({ msg: "set Image" });
});

module.exports = router;
