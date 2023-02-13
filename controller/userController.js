const User = require("../model/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const singUp = async function (req, res) {
//   try {
//     let hashPassword = bcrypt.hashSync(req.body.password, 10);
//     const user = await User.find({ email: req.body.email })
//     if (user.length > 0) {
//       res.status(403).send({
//         status: false,
//         message: "Email is already exit! try with another email",
//       })
//     } else {
//       const users = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashPassword,
//       });
//       if (users) {
//         res.status(200).send({
//           success: true,
//           message: "User inserted Successfull",
//           res: users,
//         });
//       } else {
//         res.status(404).send({
//           success: false,
//           message: "Something went wrong",
//         });
//       }
//     }
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

const generateJWT = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  return token;
};

const Signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.signup(email, password, name);
    let token = generateJWT(user);
    res
      .status(200)
      .json({ _id: user._id, email: user.email, name: user.name, jwt: token });
  } catch (err) {
    res.status(500).send(err);
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.login(email, password);
    let token = generateJWT(user)
    res.status(200).json({_id: user._id, email: user.email, jwt: token});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({message:err.message})
  }
}
module.exports = { Signup, SignIn };
