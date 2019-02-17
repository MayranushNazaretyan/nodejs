const express = require('express');
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
        message: "Handling Get request to /api/users."
    });
});

module.exports = router;
