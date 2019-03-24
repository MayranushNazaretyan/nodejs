const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/mongodb');
mongoose
    .connection
    .on('error', console.log)
    .once('open', () => console.log('Successfully connected to MongoDB'));
