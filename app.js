const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser')
const mongoURI='mongodb://localhost:27017';
const PORT = 3000;
app.use(express.static("public"));
app.set('port',PORT);
app.set('views',__dirname+"/public/views");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.render('home');
    // res.sendFile(__dirname+'/public/views/login.html');
    // console.log('')
});

app.post('/signup',(req,res)=>{
    console.log(req.body);
    res.redirect('/');
})

app.listen(PORT,()=>{
    console.log('App running on port' + PORT.toString());
})