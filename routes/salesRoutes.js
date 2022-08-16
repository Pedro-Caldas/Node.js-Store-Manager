const express = require('express');

const salesController = require('../controllers/salesController');
const saleValidation = require('../middlewares/saleValidation');

const route = express.Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
route.post('/', saleValidation.saleMiddleware, salesController.add);
route.put('/:id', saleValidation.saleMiddleware, salesController.update);
route.delete('/:id', salesController.remove);

module.exports = route;