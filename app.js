const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// import { User } from './models/user';
// import { Product } from './models/product';
// import { Importer } from './utils/importer';
// import { DirWatcher } from './utils/dirwatcher';
// import config  from './config/config.json';
const productRouts = require('./routes/products');
const usersRouts = require('./routes/users');
const authRouts = require('./routes/auth');
const citiesRouts = require('./routes/cities');

// require('./database/index');
require('./database/mongo/connection');
// new User();
// new Product();
// console.log(config.name);

// const watchPath = new DirWatcher('./data');
// watchPath.watch('./data');
// watchPath.on('change', async (path) => {
//     const obj = new Importer(path);
//     const jsonAsync = await obj.import();
//     console.log(jsonAsync, '---------jsonAsync');
//     const jsonSync = obj.importSync();
//     console.log(jsonSync, '---------jsonSync');
// });

app.use('/api/products', productRouts);
app.use('/api/users', usersRouts);
app.use('/auth', authRouts);
app.use('/api/cities', citiesRouts);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;

