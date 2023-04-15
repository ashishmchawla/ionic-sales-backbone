const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const LeadController = require("../../controllers/LeadController");

router.get("/getLeads", auth, LeadController.getLeads);

router.post("/addLead", auth, LeadController.addLead);

module.exports = router;
