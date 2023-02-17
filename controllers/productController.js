const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).json({ products })
    } catch (error) {
        res.status(404).json({ message: "No Products Founded" })
    }
}

const index = async (req, res) => {
    const products = await productModel.find()
    res.render('index', {
        allProducts: products
    });
}

const getProduct = async (req, res) => {
    const id = req.params.id

    const product = await productModel.findById(id)
    

    if (product) {
        const title = product.productName + ' | Cosmic Toys';
        res.render('productDetail', {
            title, name: product.productName, short: product.sDescription,
            large: product.lDescription, price:'Price: ' + product.price,
            age: product.recommendedAge, gender: product.gender,
            images: product.images, stock: product.inStock, offer: product.offer,

        })
    } else {
        console.log('not possible')
    }
    
}

const newProduct = (req, res) => {

    res.render('newProduct', {
        
    })
}

const createProduct = async (req, res) => {
    const { User, productName, lDescription, sDescription, price, offer, images, recommendedAge, gender, inStock } = req.body;

    const product = {
        User, productName, lDescription, sDescription, price, offer, images, recommendedAge, gender, inStock
    }

    const newProduct = await productModel.create(product)

    if (newProduct) {
        res.status(201).json({ newProduct })
    } else {
        res.status(401).json({ error: error.message })
    }
}

module.exports = {
    index,
    getAllProducts,
    getProduct,
    newProduct,
    createProduct,
}