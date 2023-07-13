const express = require("express");
const statsController = require("./../controllers/statsController");

const router = express.Router();

router.get("/overallStats", statsController.getOverallStats);

router.get("/dashboardStats", statsController.getDashboardStats);

module.exports = router;
