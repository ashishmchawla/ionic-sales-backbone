const { User } = require("../models/User");
const authRepo = require("../repositories/auth-repository");
const { statusCode } = require("../config/constants");

var register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    var result = await authRepo.register(firstName, lastName, email, password);
    if (result.statusCode === statusCode.SUCCESS) {
      var response = {
        statusCode: statusCode.SUCCESS,
        status: "SUCCESS",
        message: "User created successfully",
        _id: result.user._id,
      };
      return res.status(statusCode.SUCCESS).json(response);
    } else {
      const error = new Error("Something went wrong!");
      error.statusCode = statusCode.UNAUTHORIZED;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

var login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    var user = await authRepo.login(email, password, next);
    var token = await user.generateAuthToken(user);
    var response = {
      user: user.toJSON(user),
      token,
    };
    return res.status(statusCode.SUCCESS).json(response);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

module.exports = { register, login };
