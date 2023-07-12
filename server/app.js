const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const statsRouter = require("./routes/statsRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/stats", statsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} does not exists`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
