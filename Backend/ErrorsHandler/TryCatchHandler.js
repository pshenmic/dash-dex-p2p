const { ResponseErrorHandler } = require("./ResponseErrorHandler");

module.exports.tryCatchHandler = async (tryFn) => {
    try {
      return tryFn();
    } catch (error) {
        ResponseErrorHandler(res, 500, "Something went wrong with Server!");
    }
  };