const express = require("express");
const router = express.Router();
const {
  getLoggers,
  postLogger,
} = require("../controllers/winstonLogger-controller");
router.get("/", getLoggers);
router.post("/", postLogger);

module.exports = router;
