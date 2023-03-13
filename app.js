const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require("./routes/productRoutes");
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')

 


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/shopping-g2-app')
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err)})
 

app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
// now for public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


// seeding dummy data
// seedDB();

app.use(productRoutes);

const port = 5000;
app.listen(port,()=>{
    console.log(`server connected at port : ${port} `);
})


