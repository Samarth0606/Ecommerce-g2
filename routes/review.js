const express =  require('express');
const Product = require('../models/product');
const Review = require('../models/review');
const router = express.Router();

router.post('/products/:productId/review' , async(req,res)=>{
    // console.log(req.body);
    let {productId} = req.params;
    let {rating, comment} = req.body;
    const review = new  Review({rating, comment});
    const product = await Product.findById(productId);
    product.reviews.push(review);

    console.log(product);
    console.log(review);
    
    await product.save()
    await review.save()

    res.send('review  route');
})



module.exports = router;