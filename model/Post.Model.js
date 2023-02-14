const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  createdBy: String,
  hasImage: Boolean,
  Image: Buffer,
  caption: String,
});

module.exports = mongoose.model("post", PostSchema);
