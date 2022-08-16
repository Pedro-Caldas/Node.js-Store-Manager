const express = require('express');

const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/productValidation');

const route = express.Router();

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.put('/:id', productValidation.productMiddleware, productsController.update);
route.post('/', productValidation.productMiddleware, productsController.create);

module.exports = route;