const express      = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', function(req, res) {
    console.log('Cookies: ', req.cookies)
});

app.listen(8080);
