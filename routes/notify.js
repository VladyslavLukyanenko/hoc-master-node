const express = require('express')
const router = express.Router()
const sendWebhook = require('../actions/sendWebhook');
const notifyNodes = require('../actions/notifyNodes');
const mongoose = require('mongoose');
const Node = mongoose.model('Node');

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
sendWebhook({...payload, reason, node});
notifyNodes.notify(payload);
return response.status(200).json({success: true});
});

module.exports = router;
