// ERROR HANDLING IDEAS GOT FROM https://scoutapm.com/blog/express-error-handling AND https://medium.com/learn-with-talkrise/custom-errors-with-node-express-27b91fe2d947 AND FROM "LUÁ'S CLASS AT TRYBE (11/08/2022)"

class ApplicationError extends Error {
  constructor(status, message) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = ApplicationError;