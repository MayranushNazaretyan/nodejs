const City = require('../models/cities');

let msg = new City({
        name: "Shushan",
        country: "LA",
        capital: false,
    });

msg.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    });

exports.getAllCities = function (req, res) {
    City
        .find()
        .then((err, cities) => {
            if (err) return res.send(err);

            return res.json(cities);
        });
};

exports.getRandomCity = function (req, res) {
    City
        .count()
        .exec((err, count) => {
            if (err) return res.send(err);

            const random = Math.floor(Math.random() * count);

            City
                .findOne()
                .skip(random)
                .exec((err, city) => {
                    if (err) return res.send(err);

                    return res.json(city);
                });
        });
};

exports.postCity = async function (req, res) {
    const { name, country, capital } = req.body;
    const newCity = new City({
        name,
        country,
        capital
    });
    try {
        const createdCity = await newCity.save();

        return res.status(201).json(createdCity);
    } catch (err) {
        const messages = {};

        for (const field in err.errors) {
            if (err.errors.hasOwnProperty(field) && err.errors[field]) {
                messages[field] = err.errors[field].message;
            }
        }
        return res.status(400).send({err: messages});
    }
};

exports.updateCity = async function (req, res) {
    const { id } = req.params;

    try {
        const updatedCity = await City.findByIdAndUpdate(id, req.body);

        return res.json(updatedCity);
    } catch (err) {
        console.error(err);
    }
};

exports.deleteCity = async function (req, res) {
    const { id } = req.params;

    try {
        const result = await City.findByIdAndDelete(id);

        return res.json(result);
    } catch (err) {
        console.error(err);
    }
};


