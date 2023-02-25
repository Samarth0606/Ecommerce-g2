const express =  require('express');
const Product = require('../models/product');
const router = express.Router();

// displaying all the products
router.get('/products' , async(req,res)=>{
    let products = await Product.find({});
    res.render('products/index' , {products});
})


// adding a fomr for  anew product
router.get('/products/new' , (req,res)=>{
    res.render('products/new');
})

// actually adding a product in a DB 
router.post('/products' , async (req,res)=>{
    let {name,img,price,desc} = req.body;
    await Product.create({name,img,price,desc});
    res.redirect('/products');
})

// route for shwoing the deatails of thre products
router.get('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/show' , {foundProduct});

})


module.exports = router;