const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  inventory: Number
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;