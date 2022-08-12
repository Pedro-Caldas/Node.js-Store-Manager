const productSchema = require('./productSchema');

const isProductValid = (product) => {
  const isValid = productSchema.validate(product);
  return isValid;
};

const productMiddleware = (req, res, next) => {
  const name = { ...req.body };
  const { error } = isProductValid(name);
  console.log(error);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

module.exports = {
  productMiddleware,
};