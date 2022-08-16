const productsService = require('../services/productsService');
const ApplicationError = require('../errors/ApplicationError');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product === null) throw new ApplicationError(404, 'Product not found');
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.create(name);
  return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedProduct = await productsService.update(id, name);
  if (updatedProduct === null) throw new ApplicationError(404, 'Product not found');
  return res.status(200).json(updatedProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removedProduct = await productsService.remove(id);
  if (removedProduct === null) throw new ApplicationError(404, 'Product not found');
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};