const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser').json();
const {
    getAllCities,
    getRandomCity,
    postCity,
    updateCity,
    deleteCity
} = require('../controllers/cities');


router.get('/', getAllCities);
router.get('/random', getRandomCity);
router.post('/', bodyParser, postCity);
router.put('/:id', bodyParser, updateCity);
router.delete('/:id', deleteCity);

module.exports = router;
