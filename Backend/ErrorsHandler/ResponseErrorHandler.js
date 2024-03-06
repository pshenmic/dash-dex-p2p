function ResponseErrorHandler(res, status, message) {
    return res.status(status).json({
      errorMessage: message || "Something went wrong with your request",
    });
  }
  

  module.exports = {
    ResponseErrorHandler,
  };  