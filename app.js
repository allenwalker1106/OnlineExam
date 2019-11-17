const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser')
const MongoConnector = require('./mongodbQuery.js').MongoConnector;
const Schema = require('./mongodbQuery.js').Schema;
const DBProcedure = require('./mongodbQuery.js').DBProcedure;

MongoConnector.connect('mongodb://localhost:27017/media');

const testdata={
    user_info: {
        name: { firstName: 'asd', middleName: 'asdasd', lastName: 'asdasd' },
        username: 'asdsssasd',
        password: 'asdasssd',
        email: 'asddddasdasd@gmail.com',
        date_of_birth: '2019-11-10',
        gender: { male: 'on' },
        account_type: { taker: 'on' },
        country: 'Armenia'
    } 
};

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
    // DBProcedure.userSignup(req.body);
    DBProcedure.showAllUser();
    res.redirect('/')
})

app.get('/test',(req,res)=>{
    // DBProcedure.userSignup(req.body);
    DBProcedure.userSignup(testdata);
    res.redirect('/');
})

app.get('/show',(req,res)=>{
    
    DBProcedure.showAllUser();
    res.redirect('/');
})

app.get('/v',(req,res)=>{
    DBProcedure.validateSignup(testdata);
    res.redirect('/');
})

app.listen(PORT,()=>{
    console.log('App running on port' + PORT.toString());
})