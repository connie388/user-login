const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOTPSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    OTP: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserOTP", UserOTPSchema);
