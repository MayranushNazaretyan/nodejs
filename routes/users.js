const express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling Get request to /api/users."
    });
});

module.exports = router;
