const productsService = require('../services/productsService');
const ApplicationError = require('../errors/ApplicationError');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (!product) throw new ApplicationError(404, 'Product not found');
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};