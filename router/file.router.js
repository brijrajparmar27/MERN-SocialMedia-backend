const express = require("express");
const PostModel = require("../model/Post.Model");
const router = express.Router();

router.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const image = await PostModel.findById(id, { Image: 1 });
  res.send(image.Image);
});

router.get("/", async (req, res) => {
  const docs = await PostModel.find({}, { Image: 0 });
  res.json(docs).status(200);
});

router.post("/", async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  const doc = await PostModel.create({
    createdBy: req.body.createdBy,
    hasImage: req.body.hasImage,
    Image: req.files.Image.data,
    caption: req.body.caption,
  });

  res.send(doc);
});

module.exports = router;
