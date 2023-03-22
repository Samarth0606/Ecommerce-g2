let express =  require('express');
let app = express();
let cookieParser = require('cookie-parser');



app.use(cookieParser('youguyzareamaingloliwaskidding'));



app.get('/', (req,res)=>{
    res.send("welcome cookie");
})


app.get('/setcookie' , (req,res)=>{

    res.cookie('username' , 'samarth');
    res.cookie('favColor' , 'black');
    res.cookie('mode' , 'dark');
    res.send('sent cookies successfully');

})

app.get('/secretcookie' , (req,res)=>{
    res.cookie('dard' , 'malboro advance meethi meethi' , {signed:true});
    res.send('secret sent');
})


app.get('/getcookie' , (req,res)=>{
    // res.send(req.cookies);
    res.send(req.signedCookies);
})


app.listen(3000 , (req,res)=>{
    console.log("server running at port 3000")
})