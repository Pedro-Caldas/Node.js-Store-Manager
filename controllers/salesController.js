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

const add = async (req, res) => {
  const sale = req.body;
  const productsId = sale.map((el) => el.productId);
  await salesService.verifyProducts(productsId);
  const saleId = await salesService.addSale(sale);
  const saleAdded = await salesService.getNewSale(saleId);
  return res.status(201).json(saleAdded);
};

module.exports = {
  getAll,
  getById,
  add,
};