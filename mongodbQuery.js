const Mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new Mongoose.Schema({
    name:{
        firstName: {
            type: String,
            required: true,
            lowercase: false
        },
        middleName:{
            type:String,
            default:"",
            required: false,
        },
        lastName:{
            type: String,
            required: true,
            lowercase : false
        }
    },
    username:{
        type: String,
        required: true,
        lowercase: true,

    },
    password:{
        type: String,
        required: true,
        lowercase: false
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
    },
    date_of_birth:{
        type: Date,
        required: true,
    },
    gender:{
        type: String,
        lowercase: true,
        default: "other",
        required: true,
    },
    account_type:{
        type:String,
        required: true,
        lowercase: true
    },
    country:{
        type: String,
        required: true,
        lowercase: true,
    },
    courses:[
        {
            type: Mongoose.Schema.ObjectId,
            ref: 'Courses',
        }
    ],
    tests:[
        {
            type: Mongoose.Schema.ObjectId,
            ref: 'Tests',
        }
    ],
    questions:[
        {
            type: Mongoose.Schema.ObjectId,
            ref: 'Question',
        }
    ],
    results:[
        {
            test:{
                type:Mongoose.Schema.ObjectId,
                ref: 'Tests'
            },
            result:{
                type:Mongoose.Schema.ObjectId,
                ref:'Results'
            },
        }
    ]
    

})
const UserModel = Mongoose.model('User',userSchema);
// var URI ='mongodb://localhost:27017/media';
// Mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology: true});
// const db = Mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
//     console.log('Succesfull connect ');
// });

exports.MongoConnector ={
    connect: function(URI){
        Mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology: true});
        const db = Mongoose.connection;
        db.on('error',console.error.bind(console,'connection error:'));
        db.once('open',function(){
            console.log('Succesfull connect ');
        });
        
    }
}

exports.Schema={
    User : UserModel
}; 

validateSignup= function(data){
    // overlap username
    // overlap email
    UserModel.find({$or:[{'username':data.user_info.username},{'email':data.user_info.email}]}).countDocuments().exec((err,res)=>{
        if(err) throw err;
        console.log(res);
        if(res>0){
            console.log('False');
            return false;
        }
        else{
            console.log('Hello');
            return true;
        }
    })
    
}

userSignup = function(data){
    // if(! validateSignup(data)){
    //     console.log('Invalid');
    //     return;
    // }
    // console.log(data);
    // console.log(validateSignup(data));
    let gender='other';
    let account_type = data.user_info.account_type.taker ==='on' ? 'taker' : 'administrator';
    if(data.user_info.gender.male==='on')
        gender = 'male';
    else if(data.user_info.gender.femmale==='on')
        gender = 'female';
    
        
    let user =new UserModel({
        name:{
            firstName: data.user_info.name.firstName,
            middleName: data.user_info.name.middleName,
            lastName: data.user_info.name.lastName
        },
        username: data.user_info.username,
        password: data.user_info.password,
        email   : data.user_info.email,
        date_of_birth: data.user_info.date_of_birth,
        gender: gender,
        account_type : account_type,
        country: data.user_info.country
    })

    user.save((err,res)=>{
        if (err) throw err;
        console.log('Create user success');
    })
}


showAllUser= function(){
    UserModel.find({}).exec((err,res)=>{
        if(err) throw err;
        console.log(res);
    })
}

exports.DBProcedure={
    userSignup: userSignup,
    showAllUser:showAllUser,
    validateSignup:validateSignup
}




