const salesModel = require('../models/salesModel');

const getAll = async () => (salesModel.getAll());

const getById = async (id) => (salesModel.getById(id));

// const create = async (name) => productsModel.create(name);

module.exports = {
  getAll,
  getById,
  // create,
};