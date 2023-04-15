const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Schema = mongoose.Schema;

const LeadSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    contact: { type: Number },
    location: { type: String },
    accountCode: { type: String },
    accountCategory: { type: String },
    thirdParty: { type: String },
    leadStatus: {
      type: String,
      default: "open",
    },
    stock_margin: {
      type: Number,
      default: 0,
    },
    leadOwner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

LeadSchema.methods.toJSON = (lead) => {
  var leadObject = Object(lead);

  return _.pick(leadObject, [
    "_id",
    "firstName",
    "lastName",
    "contact",
    "location",
    "accountCode",
    "accountCategory",
    "thirdParty",
    "leadStatus",
    "stock_margin",
    "leadOwner",
  ]);
};

const Lead = mongoose.model("Lead", LeadSchema);

module.exports = { Lead };
