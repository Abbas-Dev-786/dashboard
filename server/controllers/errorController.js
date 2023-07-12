const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err, "💥");
    res
      .status(err.statusCode)
      .json({ status: err.status, message: "Something went really wrong 😓" });
  }
};

module.exports = function (err, req, res, next) {
  err.statusCode ||= 400;
  err.status ||= "fail";

  if (process.env.NODE_ENV === "dev") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "prod") {
    let error = Object.assign(err);

    sendProdError(error, res);
  }
};
