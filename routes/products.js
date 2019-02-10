const express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling Get request to /api/products."
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Handling Post request to /api/products."
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `Handling Get request to /api/products/:id where id is equal ${id}`
    });
});

router.get('/:id/reviews', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `Handling Get request to /api/products/:id/reviews where id is equal ${id}`
    });
});

module.exports = router;
