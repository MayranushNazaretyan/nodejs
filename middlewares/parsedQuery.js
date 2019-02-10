const express = require('express');
const app = express();

app.use(function(req, res, next) {
    next();
});
app.set('query parser', 'simple');
app.use(function(req, res) {
    res.send(req.query);
});

app.listen(8080);


//http://localhost:8080/?user[name]=Anahit
