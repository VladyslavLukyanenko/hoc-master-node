const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Clown = new Schema({
    Email: String,
    IP: String,
    Cards: [String]
});
module.exports = mongoose.model("Clown", Clown);