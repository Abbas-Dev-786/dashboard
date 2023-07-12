const getCountryIso3 = require("country-iso-2-to-3");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

module.exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const customers = await User.find({ role: "user" });

  res
    .status(200)
    .json({ status: "success", results: customers.length, customers });
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
