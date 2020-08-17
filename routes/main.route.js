const express = require("express");
const router = express.Router();

// @route   GET api/account/
// @desc    Get current users account
// @access  Private
router.post("/reset", (req, res) => {
  return res.json("yes");
});

module.exports = router;
