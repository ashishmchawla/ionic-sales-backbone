const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { secret } = require("../config/config");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
    notifications: {
      type: Boolean,
    },
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.methods.toJSON = (user) => {
  var userObject = Object(user);

  return _.pick(userObject, [
    "_id",
    "firstName",
    "lastName",
    "email",
    "notifications",
    "tokens",
  ]);
};

UserSchema.methods.generateAuthToken = async (user) => {
  var access = "auth";
  var token = jwt.sign({ _id: user._id, access }, secret).toString();

  user.tokens = [{ access, token }];

  return await user.save().then(() => {
    return token;
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
