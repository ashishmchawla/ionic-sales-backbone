const { Lead } = require("../models/Lead");
const { statusCode } = require("../config/constants");
const { default: mongoose } = require("mongoose");

var addLead = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      contact,
      location,
      accountCategory,
      accountCode,
      thirdParty,
      leadOwner,
    } = req.body;

    var lead = new Lead({
      firstName,
      lastName,
      contact,
      location,
      accountCategory,
      accountCode,
      thirdParty,
      leadStatus: "open",
      leadOwner,
    });

    var lead = await lead.save();
    var response = {
      _id: lead._id,
      firstName,
      lastName,
      contact,
      location,
      accountCategory,
      accountCode,
      thirdParty,
      leadStatus: "open",
      leadOwner,
    };
    return res.status(statusCode.SUCCESS).json(response);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
      return error;
    }
  }
};

var getLeads = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const user_id = req.query.user_id;

    const leads = await Lead.find({
      leadOwner: mongoose.Types.ObjectId(user_id),
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    console.log(leads);
    res.json(leads);
    // return res.status(statusCode.SUCCESS).json({ leads });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = statusCode.INTERNAL_SERVER_ERROR;
      return error;
    }
  }
};

module.exports = { addLead, getLeads };
