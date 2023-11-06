const express = require('express');
const mongoose = require('mongoose');
const Product = require('./product'); // Importing the product model.

const app = express();
const port = 3200;

mongoose.connect('mongodb+srv://nathan:NA3108tha..@cluster0.21pluz0.mongodb.net/Jumia?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to Jumia MongoDB');
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/product', (req, res) => {
    const { name, describe, price } = req.body;
    const product = new Product({ name, describe, price });

    product.save()
        .then((product) => {
            console.log(product.name + " saved to the collection.");
            res.send('Product data received and saved.');
        })
        .catch((err) => {
            console.error("Error while saving the product:", err);
            res.status(500).send('Error while saving the product.');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
