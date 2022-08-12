// ERROR HANDLING IDEAS GOT FROM https://scoutapm.com/blog/express-error-handling AND https://medium.com/learn-with-talkrise/custom-errors-with-node-express-27b91fe2d947 AND FROM "LUÁ'S CLASS AT TRYBE (11/08/2022)"

// Usa-se o || para o caso de um erro desconhecido

const errorMiddleware = (err, _req, res, _next) => res.status(err.status || 500).json({
  message: err.message,
});

module.exports = errorMiddleware;