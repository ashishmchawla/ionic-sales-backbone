const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/lead", require("./lead"));

module.exports = router;
