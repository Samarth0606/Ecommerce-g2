const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
        default:'/images/proj_dummy_img.avif'

    },
    price:{
        type:Number,
        min:0,
        default:"missing",
        required:true
    },
    desc:{
        type:String,
        trim:true
    }
})
let Product = mongoose.model('Product' , productSchema);
module.exports = Product;