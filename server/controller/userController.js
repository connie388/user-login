const UserModel = require("../models/User");
const UserOTPModel = require("../models/UserOTP");
const genMessage = require("../util/message");
const sendMail = require("../util/mailer");
const ObjectId = require("mongodb").ObjectId;
const crypto = require("crypto");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtExpirySeconds = 300;
// 86400 = 24 hrs

exports.getById = async (req, res) => {
  return res.json({ message: "Test" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.json({ success: false, message: "Email is required" });

  if (!password)
    return res.json({ success: false, message: "Password is required" });

  try {
    let user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.json({
        success: false,
        message: "Account with this email does not exist.",
      });
    }

    if (!user.verified) {
      return res.json({
        success: false,
        message: "An Email sent to your account please verify",
      });
    }


    if (await argon2.verify(user.password, password)) {
      /////////////////
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
      //   namedCurve: "sect239k1",
      // });

      // // generate a signature of the payload
      // const sign = crypto.createSign("SHA256");
      // sign.write(`${user}`);
      // sign.end();
      // var signature = sign.sign(privateKey, "hex");
      // console.log(signature);

      // // sign username
      // var token = jwt.sign({ _id: user.id }, signature, {
      //   expiresIn: jwtExpirySeconds,
      // });

      ////////////////////
      const jwtSecret = `${process.env.JWT_KEY}`;

      // Create token
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        jwtSecret,
        {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds,
        }
      );

      // save user token
      user.token = token;

      const secure = `${process.env.NODE_ENV}` !== "development";
      res.cookie("secureCookie", JSON.stringify({ token: token }), {
        secure: secure,
        httpOnly: true,
        expires: jwtExpirySeconds,
      });

      return res.status(202).json({
        token: token,
        loginname: user.name,
        success: true,
        message: "Login successful.",
      });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "System errors." });
  }
};

exports.verifyUserOTP = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });

    if (!user)
      return res.json({
        sucess: false,
        message: "Email does not exist in record. Invalid link",
      });

    const otp = await UserOTPModel.findOne({
      userId: user._id,
      OTP: req.params.OTP,
    });

    if (!otp)
      return res.json({
        success: false,
        message: "Please check if you enter the correct OTP. Invalid link",
      });

    await UserModel.updateOne({ _id: user._id }, { verified: true });

    await UserOTPModel.findByIdAndRemove(otp._id);

    return res.json({
      success: true,
      message: "email verified sucessfully",
      token: user.token, // BUGGGG
      loginname: user.name,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "An error occured" });
  }
};

exports.createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email)
    return res.json({
      success: false,
      message: "Sign up failed with no email input",
    });

  if (!password)
    return res.json({
      success: false,
      message: "Sign up failed with no password input",
    });

  if (!name)
    return res.json({
      success: false,
      message: "Sign up failed with no name input",
    });

  try {
    // check if user already exist
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.json({
        success: false,
        message: "User Already Exist. Please Login",
      });
    }

    crypto.randomBytes(32, async function (err, salt) {
      argon2.hash(password, salt).then(async (encryptedPassword) => {
        const newUser = new UserModel({
          name: name.trim(),
          email: email.toLowerCase(),
          password: encryptedPassword,
        });

        // save email, encryptedPassword
        let user = await newUser.save();

        let otp = await new UserOTPModel({
          userId: user._id,
          OTP: crypto.randomBytes(32).toString("hex"),
        }).save();

        const clickThis = `${process.env.BASE_URL}/verify-email/${user.email}/${otp.OTP}`;
        const msg = genMessage(
          user.name,
          "Welcome to the ZONE! We're very excited to have you on board.",
          "To get started with the ZONE, please click here:",
          "Confirm your account",
          "Need help, or have questions? Just reply to this email, we'd love to help.",
          clickThis
        );
        await sendMail(user.email, "Confirm your account", msg);

        return res.json({
          success: true,
          message:
            "To login, please first verify the email sent to your account",
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "System error." });
  }
};

exports.resentOTP = async (req, res) => {
  const user = await UserModel.findOne({ email: req.params.email });

  if (!user)
    return res.json({
      sucess: false,
      message: "Email does not exist.",
    });

  let otp = await new UserOTPModel({
    userId: user._id,
    OTP: crypto.randomBytes(32).toString("hex"),
  }).save();

  const clickThis = `${process.env.BASE_URL}/verify-email/${user.email}/${otp.OTP}`;

  const msg = genMessage(
    user.name,
    "You have received this email because an OTP resent request for your account was received.",
    "Click the button below to login to the ZONE with this OTP:",
    "Confirm to Login with OTP",
    "If you did not request an OTP resent, no further action is required on your part.",
    clickThis
  );

  await sendMail(user.email, "OTP Resent Request", msg);
  // BUG BUG no message box after OTP sent
  return res.json({
    success: true,
    message: "To login, please first verify the email sent to your account",
  });
};

exports.resetPwdRequest = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.json({
      success: false,
      message: "Reset password request failed as no email provided",
    });

  try {
    // check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist. Please check spelling.",
      });
    }

    const jwtSecret = `${process.env.JWT_KEY}`;

    // Create token
    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });

    const clickThis = `${process.env.BASE_URL}/update-password/${user._id}/${token}`;

    const msg = genMessage(
      user.name,
      "You have received this email because a password reset request for your account was received.",
      "Click the button below to reset your password:",
      "Reset your password",
      "If you did not request a password reset, no further action is required on your part.",
      clickThis
    );

    await sendMail(email, "Reset your password", msg);

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    // res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
    // res.end()

    return res.json({
      success: true,
      message: "We've sent password reset instructions to your email address.",
    });
  } catch (error) {
    return res.status(501).json({ success: false, message: "System errors." });
  }
};

exports.updatePassword = async (req, res) => {
  const { userId, password } = req.body;


  if (!userId)
    return res.json({
      success: false,
      message: "Update failed without a user Id",
    });

  if (!password)
    return res.json({
      success: false,
      message: "Update failed without a password",
    });


  try {
    crypto.randomBytes(32, async function (err, salt) {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "System error" });
      }
 
      argon2.hash(password, salt).then(async (encryptedPassword) => {
        let updatedUser = await UserModel.findOneAndUpdate(
          { _id: ObjectId(userId) },
          { password: encryptedPassword },
          { new: true }
        );

        if (!updatedUser) {
          return res.json({
            success: false,
            message: "User with this email does not exist.",
          });
        }

        return res
          .status(201)
          .json({ success: true, message: `Password changed successful.` });
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "System errors." });
  }
};
