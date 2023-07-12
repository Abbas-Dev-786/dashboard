const Transaction = require("../models/transactionModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

module.exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

  // formatted sort should look like { userId: -1 }
  const generateSort = () => {
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: sortParsed.sort == "asc" ? 1 : -1,
    };

    return sortFormatted;
  };
  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const transactions = await Transaction.find({
    $or: [
      { cost: { $regex: new RegExp(search, "i") } },
      { userId: { $regex: new RegExp(search, "i") } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  const total = await Transaction.countDocuments({
    name: { $regex: search, $options: "i" },
  });

  res.status(200).json({
    transactions,
    total,
  });
});

module.exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new AppError("transaction does not exists", 404));
  }

  res.status(200).json({ status: "success", transaction });
});
