const mongoose = require('mongoose');
const Node = mongoose.model('Node');
const axios = require('axios');

module.exports.notify = async function(payload){
    const nodes = await Node.find();
    nodes.forEach(async (node) => await axios.post(`${node.URI}/api/execute`, {...payload, secret: node.Secret}))
};