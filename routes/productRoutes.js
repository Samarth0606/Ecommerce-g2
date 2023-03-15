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
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show' , {foundProduct});

})

// form to edit a product
router.get('/products/:id/edit', async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit' , {foundProduct})
})


// actually changing the product in db
router.patch('/products/:id' , async (req,res)=>{
    let {id} = req.params;
    let {name , img, price , desc} = req.body;
    await Product.findByIdAndUpdate(id ,  {name , img, price , desc});
    res.redirect('/products');
})

//deleting a product
router.delete('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');

})

module.exports = router;