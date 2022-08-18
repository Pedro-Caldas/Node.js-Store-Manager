const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const salesProductsModel = require('../models/salesProductsModel');
const ApplicationError = require('../errors/ApplicationError');

// const getAll = async () => (salesModel.getAll());
async function getAll() {
  const result = await salesModel.getAll();
  return result;
}

// const getById = async (id) => (salesModel.getById(id));
async function getById(id) {
  const result = await salesModel.getById(id);
  return result;
}

const verifyProducts = async (productsId) => {
  const products = await productsModel.getAll();
  const existingIds = products.map((product) => product.id);
  productsId.forEach((_el, index) => {
    if (!existingIds.includes(productsId[index])) {
      throw new ApplicationError(404, 'Product not found');
    }
  });
};

const addSale = async (sale) => {
  const saleId = await salesModel.addSale();
  await salesProductsModel.addSalesProducts(sale, saleId);
  return saleId;
};

const getNewSale = async (id) => {
  const productsSold = await salesProductsModel.getSalesProducts(id);
  const itemsSold = productsSold.map((el) => ({ productId: el.product_Id, quantity: el.quantity }));
  const saleObject = { id: id.id, itemsSold };
  return saleObject;
};

// const update = async (id, sale) => salesProductsModel.update(id, sale);
async function update(id, sale) {
  const result = await salesProductsModel.update(id, sale);
  return result;
}

// const remove = async (id) => salesModel.remove(id);
async function remove(id) {
  const result = await salesModel.remove(id);
  return result;
}

module.exports = {
  getAll,
  getById,
  addSale,
  verifyProducts,
  getNewSale,
  update,
  remove,
};