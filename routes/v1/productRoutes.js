const express = require('express');
const productCtr = require('../../controllers/productController');

const productRoute = express.Router();

productRoute.get('/index', productCtr.index);
productRoute.get('/detail/:id', productCtr.getProduct);
productRoute.get('/new-product', productCtr.newProduct);
productRoute.post('/create', productCtr.createProduct)

module.exports = productRoute;