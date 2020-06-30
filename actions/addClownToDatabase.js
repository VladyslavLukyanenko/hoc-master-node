const mongoose = require('mongoose');
const Clown = mongoose.model('Clown');

module.exports = async function(clown){
await Clown.create({
    Email: clown.email,
    IP: clown.ip,
    Cards: clown.cards
    });
};