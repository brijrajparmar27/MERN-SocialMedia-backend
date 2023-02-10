const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password, name) {
  const user = await this.findOne({ email: email });
  if (user) {
    throw Error("Already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const encrypted_pass = await bcrypt.hash(password, salt);

  let newUser = { email: email, password: encrypted_pass, name: name };

  const created_user = await this.create(newUser);

  return created_user;
};

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email: email });
    if (!user) {
        throw Error('Email is not correct');
    }
    let isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        throw Error('Password doesnt matched!')
    }
    return user; 
};

module.exports = mongoose.model("userModel", userSchema, "User");
