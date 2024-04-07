const express = require("express");
const mongoose = require("mongoose");
const productRoute = require('./routes/product.route.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", function (req, res) {
  res.send("Hello World, still griding. Just installed nodemon");
});

app.use('/api/products', productRoute);

mongoose
  .connect(
    "mongodb+srv://brukmakeni:5I1SKExU7jLiLLts@backend.9cdurq3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Backend"
  )
  .then(() => {
    console.log("Connected to database.");
    app.listen(8000, () => {
      console.log("The server is running.");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });


// add a product
// app.post('/api/products', async (req, res) => {
//     try{
//         const product = await Product.create(req.body);
//         res.status(200).json(product);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }

//     // console.log(req.body);
//     // res.send(req.body);
// })


// Get all products
// app.get('/api/products', async (req, res) => {
//     try{
//         const products = await Product.find({});
//         res.status(200).json(products);
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// });

// Get a single product bt ID
// app.get('/api/product/:id', async (req, res) => {
//     try{
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// })


// update product api
// app.put('/api/product/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         if (!product){
//             return res.status(404).json({message: "Product not found"});
//         }
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct);

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// delete product api
// app.delete('/api/product/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndDelete(id);
//         if (!product){
//             return res.status(404).json({message: "Product not found"})
//         }
//         res.status(200).json({message: "Product deleted successfully"});
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })