const productsModel = require('../models/productsModel');

const getAll = async () => (productsModel.getAll());

const getById = async (id) => productsModel.getById(id);

const create = async (name) => productsModel.create(name);

const update = async (id, name) => productsModel.update(id, name);

module.exports = {
  getAll,
  getById,
  create,
  update,
};