module.exports.responseErrorHandler = (res, status, message) => {
    return res.status(status).json({
      errorMessage: message || "Something went wrong with your request",
    });
  }
  