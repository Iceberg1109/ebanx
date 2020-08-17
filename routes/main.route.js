const express = require("express");
const router = express.Router();

const mainController = require("../controller/main.controller");

// @route   POST /reset/
// @desc    Reset the whole account data
// @access  Public
router.post("/reset", (req, res) => {
  mainController.reset();
  return res.status(200).send();
});

// @route   POST /event/
// @desc    Reset the whole account data
// @access  Public
router.post("/event", (req, res) => {
  const { type, destination, amount } = req.body;
  console.log(type, destination, amount);
  switch (type) {
    case "deposit":
      const data = mainController.deposit(destination, amount);
      return res.status(201).json({ destination: data });
      break;
  }
});

module.exports = router;
