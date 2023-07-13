const getCountryIso3 = require("country-iso-2-to-3");
const User = require("../models/userModel");
const AffiliateStat = require("../models/affiliateStatModel");
const Transaction = require("./../models/transactionModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
const { default: mongoose } = require("mongoose");

module.exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const customers = await User.find({ role: "user" });

  res
    .status(200)
    .json({ status: "success", results: customers.length, customers });
});

module.exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await User.find({ role: "admin" });

  res.status(200).json({ status: "success", results: admins.length, admins });
});

module.exports.getGeography = catchAsync(async (req, res, next) => {
  const users = await User.find();

  const mappedLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryIso3(country);
    if (!acc[countryISO3]) {
      acc[countryISO3] = 0;
    }
    acc[countryISO3]++;
    return acc;
  }, {});

  const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => {
      return { id: country, value: count };
    }
  );

  res.status(200).json(formattedLocations);
});

module.exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("user does not exists", 404));
  }

  res.status(200).json({ status: "success", user });
});

module.exports.getUserPerformance = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const [userWithStats] = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "affiliatestats",
        localField: "_id",
        foreignField: "userId",
        as: "affiliateStats",
      },
    },
    { $unwind: "$affiliateStats" },
  ]);

  const saleTransactions =
    userWithStats?.affiliateStats &&
    (await Promise.all(
      userWithStats.affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    ));
  const filteredSaleTransactions = saleTransactions?.filter(
    (transaction) => transaction !== null
  );

  res
    .status(200)
    .json({ user: userWithStats, sales: filteredSaleTransactions });
});
