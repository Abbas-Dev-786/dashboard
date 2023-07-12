const Product = require("../models/productModel");
const ProductStat = require("../models/productStatModel");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

module.exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  const productWithStats = await Promise.all(
    products.map(async (product) => {
      const stat = await ProductStat.find({ productId: product._id });

      return { ...product._doc, stat };
    })
  );

  res
    .status(200)
    .json({
      status: "success",
      results: productWithStats.length,
      productWithStats,
    });
});

module.exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("product does not exists", 404));
  }

  res.status(200).json({ status: "success", product });
});
