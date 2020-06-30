const mongoose = require('mongoose');

registerSchemas();

const mongoDB = process.env.MONGO_DB_URI;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function registerSchemas() {
    require('../schemas/Node');
    require('../schemas/Clown');
}