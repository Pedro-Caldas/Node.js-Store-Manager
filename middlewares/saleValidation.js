const arraySchema = require('./saleSchema');

const isSaleValid = (sale) => {
  const isValid = arraySchema.validate(sale);
  return isValid;
};

const saleMiddleware = (req, res, next) => {
  console.log(req.body);
  const sale = req.body;
  const { error } = isSaleValid(sale);
  console.log(error);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

module.exports = {
  saleMiddleware,
};