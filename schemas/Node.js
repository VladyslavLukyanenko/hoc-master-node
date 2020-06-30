const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Node = new Schema({
  Secret: String,
  Name: String,
  Owner: String,
  Logo: String,
  URI: String
});
module.exports = mongoose.model("Node", Node);