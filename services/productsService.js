const productsModel = require('../models/productsModel');

// const getAll = async () => (productsModel.getAll());
async function getAll() {
  const result = await productsModel.getAll();
  return result;
}

// const getById = async (id) => productsModel.getById(id);
async function getById(id) {
  const result = await productsModel.getById(id);
  return result;
}

// const create = async (name) => productsModel.create(name);
async function create(name) {
  const result = await productsModel.create(name);
  return result;
}

// const update = async (id, name) => productsModel.update(id, name);
async function update(id, sale) {
  const result = await productsModel.update(id, sale);
  return result;
}

// const remove = async (id) => productsModel.remove(id);
async function remove(id) {
  const result = await productsModel.remove(id);
  return result;
}

const search = async (q) => productsModel.search(q);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  search,
};