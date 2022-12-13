const mongoose = require("mongoose");
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
