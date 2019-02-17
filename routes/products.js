const express = require('express');
const jwt  = require('jsonwebtoken');
let router = express.Router();

checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.json({success: false, message: err.message})
            } else {
                // some logic here
                next();
            }
        })
    } else {
        res.status(403).send({success: false, message: "no token provided"});
    }
};

router.get('/', checkToken, (req, res, next) => {
    res.status(200).json({
        message: "Handling Get request to /api/products."
    });
});

router.post('/', checkToken, (req, res, next) => {
    res.status(201).json({
        message: "Handling Post request to /api/products."
    });
});

router.get('/:id', checkToken, (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `Handling Get request to /api/products/:id where id is equal ${id}`
    });
});

router.get('/:id/reviews', checkToken, (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `Handling Get request to /api/products/:id/reviews where id is equal ${id}`
    });
});

module.exports = router;
