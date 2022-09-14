const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var UserSchema = new Schema(
  {
    name: { type: String, min: 3, max: 255, default: null },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    token: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
