
const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser')
const MongoConnector = require('./mongodbQuery.js').MongoConnector;
const Schema = require('./mongodbQuery.js').Schema;
const DBProcedure = require('./mongodbQuery.js').DBProcedure;

var expressSession = require('express-session');

//new commit 
// MongoConnector.connect('mongodb://localhost:27017/media');
MongoConnector.connect('mongodb+srv://coldblood101:Dragon1774@mastercluster-lhsxk.azure.mongodb.net/onlineexam?retryWrites=true&w=majority')
app.use(expressSession({
    secret: 'secretaakey',
    resave: false,
    saveUninitialized: true
}));

const PORT = 3000;
app.use(express.static("public"));
app.set('port',PORT);
app.set('views',__dirname+"/public/views");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));


var session = require('express-session');


app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/signin',(req,res)=>{
    res.render('signin',{user:{username:""}});
})
app.post('/signin',(req,res)=>{
    DBProcedure.getUser(req.body.user_info).countDocuments().exec((err,result)=>{
        if(err) throw err;
        if(result!=1){
            res.render('signin',{user:{username:req.body.user_info.user_info.username}});
            
        }
        else{
            DBProcedure.getUser(req.body.user_info).exec((err,result)=>{
                if(err) throw err;
                var sessData = req.session;
                sessData.user = result;
                res.render('dashboard',{user:result});
            })
        }
    });
})
app.post('/signup',(req,res)=>{
    DBProcedure.userSignup(req.body.user_info);
    res.redirect('/signin')
})

app.get('/test',(req,res)=>{
    if(req.session.user){
        var p = getQuestionBank(req.session.user);
        p.exec((err,rest)=>{
        if(err) throw err;
        console.log(rest);
    })
    }else
        res.redirect('/signin');
    
})


app.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }else
        res.render('signin',{user:{username:""}});
})




app.get('/qchoice',(req,res)=>{
    if(req.session.user){
        res.render('qchoice',{user:req.session.user})
    }
});

app.post('/qchoice',(req,res)=>{
    //create question
    console.log(req.body.user_info);
    DBProcedure.addQuestion(req.body.user_info);
    res.render('qchoice',{user:req.session.user})
})  


app.get('/questions',(req,res)=>{
    res.render('questions',{user:req.session.user,questions:[{topic:'topic',title:' title',type:'type',create_date:'create-date',last_modified:'modified',result:'result',import_in:[{name:'test1'},{name:'test2'}]},{topic:'topic',title:' title',type:'type',create_date:'create-date',last_modified:'modified',result:'result',import_in:[{name:'test1'},{name:'test2'}]}]});
})

app.get('/tests',(req,res)=>{
    res.render('tests',{user:req.session.user,tests:[{topic:'topic',description:' title',type:'type',create_date:'create-date',last_modified:'modified',result:'result',import_in:[{name:'test1'},{name:'test2'}]},{topic:'topic',description:' title',type:'type',create_date:'create-date',last_modified:'modified',result:'result',import_in:[{name:'test1'},{name:'test2'}]}]});
})


app.get('/links',(req,res)=>{
    res.render('links',{user:req.session.user,links:[{link_name:'link1',test_name:'test1'},{link_name:'link2',test_name:'test2'}]});
})


app.get('/dashboard',(req,res)=>{
    res.render('dashboard',{user:req.session.user});
})


app.get('/groups',(req,res)=>{
    res.render('groups',{user:req.session.user,groups:[{name:'group1',members:["1","2","3","4"]},{name:'group2',members:["1","2","3","4","5","6"]},{name:'group3',members:["1","2",]}]});
})


app.get('/results',(req,res)=>{
    res.render('results',{user:req.session.user,results:[{test_name:'test1',members:["1","2","3","4","5","6"]},{test_name:'test2',members:["1","2",]}]});
})


app.get('/files',(req,res)=>{
    res.render('upload_files',{user:req.session.user,files:[{question_id:'q1',data_link:'link1',type:'.jpeg'},{question_id:'q2',data_link:'link2',type:'.png'},{question_id:'q3',data_link:'link3',type:'.mp3'}]});
})

app.get('/user',(req,res)=>{
    res.render('profile',{user:req.session.user,username: 'allen'})
})


app.post('/createQChoice',(req,res)=>{
    res.redirect('create_question');
})
app.get('')

app.listen(PORT,()=>{
    console.log('App running on port' + PORT.toString());
})