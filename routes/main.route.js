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
  const { type } = req.body;
  let data = null;
  switch (type) {
    case "deposit":
      data = mainController.deposit(req.body.destination, req.body.amount);
      return res.status(201).json({ destination: data });
      break;
    case "withdraw":
      data = mainController.withdraw(req.body.origin, req.body.amount);
      if (data === "account_not_found") return res.status(404).json(0);
      return res.status(201).json({ origin: data });
      break;
  }
});

module.exports = router;
