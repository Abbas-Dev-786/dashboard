require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const ProductStat = require("./models/productStatModel");
const Transaction = require("./models/transactionModel");
const OverallStat = require("./models/overallStatsModel");
const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
} = require("./dev-data/data");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected Successfully");

    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat);
  })
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
