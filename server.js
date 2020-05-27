const db = require("./models");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/getProducts", function (req, res) {
    db.Product.find({}).then(results => {
        res.json(results);
    });
});

app.get("/product/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/product.html"));
});

app.get("/api/getProduct/:id", function (req, res) {
    db.Product.find({ _id: req.params.id }).then(results => {
        res.json(results);
    });
});

app.post("/api/form/", function (req, res) {
    db.Customer.create({
        fname: req.body.name,
        email: req.body.email
    }).then(customer => {
        db.Order.create({
            customer: customer._id,
            product: req.body.productId,
            qty: req.body.quantity
        }).then(order => {
            console.log("order._id is: " + order._id);
            console.log("customer._id is: " + customer._id);
            db.Customer.findOneAndUpdate(
                {_id: customer._id},
                {
                    $push: {orders: order._id}
                }
                //{new: true}
            );
        });
    })
})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/storedb", { useNewUrlParser: true });



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});






// db.products.insert({name: "Bike", description: "Two wheeled bike", price: "200", inventory: 10})
// db.products.insert({name: "Speakers", description: "Large black speakers", price: "100", inventory: 20})
// db.products.insert({name: "Notebook", description: "Brown suede notebook", price: "10", inventory: 30})
// db.products.insert({name: "Coffee mug", description: "Ceramic coffee mug", price: "5", inventory: 15})
// db.products.insert({name: "Water bottle", description: "Plastic water bottle", price: "2", inventory: 50})