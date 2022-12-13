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
      return error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

module.exports = { register };
