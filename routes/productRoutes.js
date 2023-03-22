const express =  require('express');
const Product = require('../models/product');
const router = express.Router();

// displaying all the products
router.get('/products' , async(req,res)=>{
    try{

        let products = await Product.find({});
        res.render('products/index' , {products});

    }
    catch(e){
        res.render('error' , {err: e.message} )
    }
    
})


// adding a fomr for  anew product
router.get('/products/new' , (req,res)=>{
    try{

        res.render('products/new');
    }

    catch(e){
        res.render('error' , {err: e.message} )
    }
})

// actually adding a product in a DB 
router.post('/products' , async (req,res)=>{
    try{

        let {name,img,price,desc} = req.body;
        await Product.create({name,img,price,desc});
        res.redirect('/products');
    }

    catch(e){
        res.render('error' , {err: e.message} )
    }
})

// route for shwoing the deatails of thre products
router.get('/products/:id' , async(req,res)=>{
    try{

        let {id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show' , {foundProduct});
    }

    catch(e){
        res.render('error' , {err: e.message} )
    }

})

// form to edit a product
router.get('/products/:id/edit', async(req,res)=>{
    try{

        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit' , {foundProduct});
    }

    catch(e){
        res.render('error' , {err: e.message} )
    }
})


// actually changing the product in db
router.patch('/products/:id' , async (req,res)=>{
    try{

        let {id} = req.params;
        let {name , img, price , desc} = req.body;
        await Product.findByIdAndUpdate(id ,  {name , img, price , desc});
        res.redirect('/products');
    }

    catch(e){
        res.render('error' , {err: e.message} )
    }
})

//deleting a product
router.delete('/products/:id' , async(req,res)=>{
    try{
        let {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
        
    catch(e){
        res.render('error' , {err: e.message} )
    }

})

module.exports = router;