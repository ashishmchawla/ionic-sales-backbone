const authRepo = require("../repositories/auth-repository");
const { statusCode } = require("../config/constants");

var register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    var result = await authRepo.register(firstName, lastName, email, password);
    if (result.statusCode === statusCode.SUCCESS) {
      var user = await authRepo.login(email, password, next);
      var token = await user.generateAuthToken(user);
      var response = {
        statusCode: statusCode.SUCCESS,
        status: "SUCCESS",
        message: "User created successfully",
        _id: result.user._id,
        firstName,
        lastName,
        email,
        notifications: result.user.notifications,
        token: token,
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
    if (user instanceof Error) {
      return res.status(user.statusCode).json({ message: user.message });
    } else {
      var token = await user.generateAuthToken(user);
      var response = {
        statusCode: statusCode.SUCCESS,
        status: "SUCCESS",
        message: "User logged in successfully",
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        notifications: user.notifications,
        token: token,
      };
      return res.status(statusCode.SUCCESS).json(response);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

module.exports = { register, login };
