const express = require('express');

const salesController = require('../controllers/salesController');
// const productValidation = require('../middlewares/productValidation');

const route = express.Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
// route.post('/', productValidation.productMiddleware, productsController.create);

module.exports = route;