const express = require('express')
const router = express.Router()
const addClown = require('../actions/addClownToDatabase');
const sendWebhook = require('../actions/sendWebhook');
const notifyNodes = require('../actions/notifyNodes');
const mongoose = require('mongoose');
const Node = mongoose.model('Node');
const Clown = mongoose.model('Clown');

router.post('/', async function (request, response) {
const { customer_email_address, customer_purchase_ip, cards, reason, secret} = request.body;
const node =  await Node.findOne({
    Secret: secret
});
if (!node) return response.status(403).json({success: false});

const payload = {
    email: customer_email_address,
    ip: customer_purchase_ip,
    cards,
    reason: "Fraud"
};
const clown = await Clown.findOne({
    Email: customer_email_address
});
if(!clown) await addClown(payload);
sendWebhook({...payload, reason, node});
notifyNodes(payload);
return response.status(200).json({success: true});
});

module.exports = router;