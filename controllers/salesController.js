const salesService = require('../services/salesService');
const ApplicationError = require('../errors/ApplicationError');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (sale === null) throw new ApplicationError(404, 'Sale not found');
  return res.status(200).json(sale);
};

// const create = async (req, res) => {
//   const { name } = req.body;
//   const newProduct = await productsService.create(name);
//   return res.status(201).json(newProduct);
// };

module.exports = {
  getAll,
  getById,
  // create,
};