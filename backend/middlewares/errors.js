const { Mongoose } = require("mongoose");
const ErrorHandler = require("../utils/errrorHandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    //wrong moogose object ID error
    if (err.name == "castError") {
      const message = ` Resource not found. invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose validation error
    if (err.name === "validationError") {
      const message = object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
  }

  err.message = err.message || "Inernal Server Error";

  res.status(err.statuscode).json({
    sucess: false,
    message: error.message || "Internal Server Error",
  });
};
