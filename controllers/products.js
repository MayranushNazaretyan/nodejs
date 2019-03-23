const ProductModel = require('../models/Product');
const sequelize = require('../database');
const Sequelize = require('sequelize');

const Product = ProductModel(sequelize, Sequelize);

exports.getAllProducts = function (req, res) {
    Product
        .findAll()
        .then(products => {
            console.log(products,'------------');
            return res.json(products)
        })
        .catch(error => res.send(error));
};

exports.postProduct = function (req, res) {
    const { title } = req.body;
    const newProduct = {
        title,
    };

    Product
        .create(newProduct)
        .then(() => {
            Product
                .findAll()
                .then(products => {
                    return res.json(products)
                })
                .catch(error => res.send(error));
        })
        .catch(error => res.send(error));
};

exports.getProductById = function (req, res) {
    const { id } = req.params;
    Product
        .findById(id)
        .then(product => {
            if (!product) {
                res
                    .status(404)
                    .json({ message: 'Product not found.' });
            } else {
                res.json(product);
            }
        })
        .catch(error => res.send(error));
};


exports.getProductReviews = function (req, res) {
    const { id } = req.params;
    Product
        .findById(id)
        .then(product => {
            if (!product) {
                res
                    .status(404)
                    .json({ message: 'Product not found.' });
            } else {
                res.json(product.title);
            }
        })
        .catch(error => res.send(error));
};
