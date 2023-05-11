const { generateOTP } = require("../services/OTP");
const { encrypt, compare } = require("../services/crypto");
const { sendMail } = require("../services/MAIL");
const User = require("../models/userSchema");
const bodyParser = require("body-parser");
const { JWT_SECRET } = require("../constants/constants");
var jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports.signUpUser = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send("already existing");
  }

  //create  new user
  const newUser = await createUser(email, password);
  const token = newUser[2];

  if (!newUser[0]) {
    return res.status(400).send({
      message: "unable to create new user",
    });
  }
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  console.log(newUser);

  res.redirect("/verify");
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  if (user[0]) {
    res.redirect("/login");
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const flag = await validateUserLogin(email, password);

  //   res.redirect("/homeroute");
  // res.send(flag);
  if (flag) {
    res.redirect("/userbase");
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });

  const token = createToken(newUser._id);

  if (!newUser) {
    return [false, "unable to sign you up "];
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true, newUser, token, newUser._id];
  } catch (error) {
    return [false, "unable to sign up , please try again later", error];
  }
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, "user not found"];
  }
  if (user && user.otp !== otp) {
    return [false, "invalid otp"];
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};

const validateUserLogin = async (email, password) => {
  const hash = await encrypt(password);
  const hashedPassword = await compare(password, hash);
  const user = await User.findOne({
    email,
  });
  console.log(hashedPassword);

  if (!user) {
    return [false, "user not found"];
  }
  if (user && hashedPassword != true) {
    console.log(user);
    console.log(user.password);
    return [false, "invalid password"];
  }

  return [true, "login successfull"];
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: maxAge });
};
