const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;