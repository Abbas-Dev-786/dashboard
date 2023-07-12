const OverallStat = require("../models/overallStatsModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

module.exports.getOverallStats = catchAsync(async (req, res, next) => {
  const stats = await OverallStat.find();

  res.status(200).json({ status: "success", result: stats.length, stats });
});
