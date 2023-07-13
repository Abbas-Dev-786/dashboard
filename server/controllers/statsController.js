const OverallStat = require("../models/overallStatsModel");
const Transaction = require("../models/transactionModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

module.exports.getOverallStats = catchAsync(async (req, res, next) => {
  const stats = await OverallStat.find();

  res.status(200).json({ status: "success", result: stats.length, stats });
});

module.exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // hardcoded values
  const currentMonth = "November";
  const currentYear = 2021;
  const currentDay = "2021-11-15";

  /* Recent Transactions */
  const transactions = await Transaction.find()
    .limit(50)
    .sort({ createdOn: -1 });

  /* Overall Stats */
  const overallStat = await OverallStat.find({ year: currentYear });

  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
  } = overallStat[0];

  const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
  });

  const todayStats = overallStat[0].dailyData.find(({ date }) => {
    return date === currentDay;
  });

  res.status(200).json({
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
    thisMonthStats,
    todayStats,
    transactions,
  });
});
