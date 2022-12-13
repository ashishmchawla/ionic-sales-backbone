const bcrypt = require("bcryptjs");

const { User } = require("../models/User");
const { statusCode } = require("../config/constants");
const { secret } = require("../config/config");

var register = async (firstName, lastName, email, password, next) => {
  try {
    var checkUser = await User.findOne({ email });
    if (checkUser) {
      const error = new Error("A user with above email already exists");
      error.statusCode = statusCode.UNAUTHORIZED;
      console.log(error);
      return error;
    }

    var hashPw = await bcrypt.hash(password, secret.length);

    var user = new User({
      firstName,
      lastName,
      email,
      password: hashPw,
      notifications: true,
    });

    var user = await user.save();
    return { user, statusCode: statusCode.SUCCESS };
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
      return error;
    }
    // next(error);
  }
};

module.exports = { register };
