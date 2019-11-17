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
        name: { firstName: 'asssd', middleName: 'asdasd', lastName: 'asdasd' },
        username: 'allen',
        password: '123',
        email: 'asddddddssasdddasdasd@gmail.com',
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
});

app.get('/help',(req,res)=>{
    res.render('help');
})

app.get('/howitwork',(req,res)=>{
    res.render('howitwork');
})

app.get('/signin',(req,res)=>{
    res.render('signin',{user:{username:""}});
})


app.post('/signup',(req,res)=>{
    DBProcedure.userSignup(req.body);
    res.redirect('/signin')
})



app.post('/signinAccount',(req,res)=>{
    console.log(req.body);
    DBProcedure.getUser(req.body).countDocuments().exec((err,result)=>{
        if(err) throw err;
        if(result!=1){
            console.log({username:req.body.user_info.username});
            res.render('signin',{user:{username:req.body.user_info.username}});
            
        }
        else{
            DBProcedure.getUser(req.body).exec((err,result)=>{
                if(err) throw err;
                console.log(result);
                res.render('front_page',{user:result});
            })
        }
    });
})












app.get('/test',(req,res)=>{
    DBProcedure.getUser(testdata).exec((err,result)=>{
        if(err) throw err;
        console.log(req.body);
        res.render('home',{user:result});
    
    })
})

app.get('/show',(req,res)=>{
    DBProcedure.getUser(testdata)
    // res.redirect('/');
})


app.listen(PORT,()=>{
    console.log('App running on port' + PORT.toString());
})