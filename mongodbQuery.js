const Mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new Mongoose.Schema({
    name:{
        firstname: {
            type: String,
            required: true,
            lowercase: false
        },
        middlename:{
            type:String,
            default:"",
            required: false,
        },
        lastname:{
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
    profile_image_link:{
        type: String,
        default: "/data/image/default_avata.png"
    },
    address:{
        city:{
            type: String,
            lowercase: true,
        },
        country:{
            type: String,
            required: true,
            lowercase: true,
        }

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
            type:Mongoose.Schema.ObjectId,
            ref:'Results'
        }
    ],
    links:[
        {
            type: Mongoose.Schema.ObjectId,
            ref: 'Links',
        }
    ],
    files:[
        {
            type: Mongoose.Schema.ObjectId,
            ref: 'Files',
        }
    ]
})

const UserModel = Mongoose.model('User',userSchema);

const courseSchema = new Mongoose.Schema({
    name:{
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    administrator:{
        type:Mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    members:[{
        type:Mongoose.Schema.ObjectId,
        ref:'User'
    }],
    create_date:{
        type: Date,
        default:Date.now
    }

})
const CourseModel = Mongoose.model('Course', courseSchema, 'courses');

const resultSchema= new Mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	owner:{
		type: Mongoose.Schema.ObjectId,
		ref: 'Users'
	},
	result:[{
		question_id:{
			type:Mongoose.Schema.ObjectId,
			required: true
		},
		answear:{
			type:Object,
			required:true
		}
	}]
})

const ResultModel=('Result',resultSchema,"results");
const testSchema =  new Mongoose.Schema({
	name: {
		type: String,
		required:true,
		min: 6,
		max: 255
	},
	desciption: {
		type:String,
		min: 6,
		max : 1024
	},
	questions:[{
		type: Mongoose.Schema.ObjectId,
		ref:'Questions'
	}],
	create_date:{
		type:Date,
		default: Date.now
	},
	owner:{
		type: Mongoose.Schema.ObjectId,
		ref: 'Users'
	}
})

const TestModel =Mongoose.model('Test',testSchema,'tests');


const qchoice_schema = new Mongoose.Schema({
	type:{
		type:String,
		required: true,
		default:"choices"
	},
	topic:{
		type:String,
		required:true,
		default:'general'
	},
	owner:{
		type:Mongoose.Schema.ObjectId,
		ref:'Users'
	},
	max_choices:{
		type:Number, 
		min:1,
		default:1,
		required: true
	},
	body:{
		type:String,
		required: true,
	},
	imported:[{
		type:Mongoose.Schema.ObjectId,
	}],
	options:{
		type:Array,
		default:[],
		required: true
	},
	result:{
		type:Array,
		default:[],
		required: true
	}
})


// const QChoices = Mongoose.model('QChoices',qchoice_schema,'questions');

const Question = Mongoose.model('QChoices',qchoice_schema,'questions');

const qcode_schema = new Mongoose.Schema({
	type:{
		type:String,
		required: true,
		default:"code"
	},
	topic:{
		type:String,
		required:true,
		default:'general'
	},
	owner:{
		type:Mongoose.Schema.ObjectId,
		ref:'Users'
	},
	body:{
		type:String,
		required: true,
	},
	imported:[{
		type:Mongoose.Schema.ObjectId,
	}],
	options:{
	},
	result:[
		{
			input:{
				type:String,
				required:true,
				lowercase: true
			},
			out:{
				type:String,
				required:true,
				lowercase: true
			}
		}
	]
})


const QCOde = Mongoose.model('QCode',qcode_schema,'questions');



const qmatching_schema = new Mongoose.Schema({
	type:{
		type:String,
		required: true,
		default:"matching"
	},
	topic:{
		type:String,
		required:true,
		default:'general'
	},
	owner:{
		type:Mongoose.Schema.ObjectId,
		ref:'Users'
	},
	body:{
		type:String,
		required: true,
	},
	imported:[{
		type:Mongoose.Schema.ObjectId,
	}],
	options:{
		head:{
			type:Array,
			default:[],
			required: true
		},
		tail:{
			type:Array,
			default:[],
			required: true
		}
	},
	result:[
		{
			head:{
				type:String,
				required:true,
				lowercase: true
			},
			tail:{
				type:String,
				required:true,
				lowercase: true
			}
		}
	]
})


const QMatching = Mongoose.model('QMatching',qmatching_schema,'questions');



const qvalidate_schema = new Mongoose.Schema({
	type:{
		type:String,
		required: true,
		default:"true_false"
	},
	topic:{
		type:String,
		required:true,
		default:'general'
	},
	owner:{
		type:Mongoose.Schema.ObjectId,
		ref:'Users'
	},
	body:{
		type:String,
		required: true,
	},
	imported:[{
		type:Mongoose.Schema.ObjectId,
	}],
	result:{
		type: Boolean,
		required: true,

	}
})


const QValidate = Mongoose.model('QValidate',qvalidate_schema,'questions');

createQuestion = function(data,user,type){
    if(type==='choices'){
        var options = []
        for(var i =0 ;i<data.question.options.length ; i++)
            if(data.question.options[i]!='')
                options.push(data.question.options[i])
            var question = new QChoices({
            type:type,
            topic:data.question.topic,
            owner:user._id,
            max_choices:1,
            body:data.question.body,
            options:options,
            result:[options[parseInt(data.question.result)]]
        })
        question.save((err,res)=>{
            if(err) throw errr;
            var questions_list = user.questions;
            questions_list.push(res._id);
            user.questions.push(res._id);
            console.log(questions_list);
            UserModel.updateOne({ _id:user._id}, { $set: { questions: questions_list } },(err,res)=>{
                if (err) throw err;
            });
            console.log('Susscess create question')
        })
    }
}

validateSignup= function(data){
    // overlap username
    // overlap email
    return UserModel.find({$or:[{'username':data.username},{'email':data.email}]}).countDocuments();
}

userSignup = function(data){
    validateSignup(data).exec((err,res)=>{
        if(res==0)
        {
            let gender='other';
            let account_type = data.account_type.taker ==='on' ? 'taker' : 'administrator';
            if(data.gender.male==='on')
                gender = 'male';
            else if(data.gender.femmale==='on')
                gender = 'female';
            
                
            let user =new UserModel({
                name:{
                    firstname: data.name.firstname,
                    middlename: data.name.middlename,
                    lastname: data.name.lastname
                },
                username: data.username,
                password: data.password,
                email   : data.email,
                date_of_birth: data.date_of_birth,
                gender: gender,
                account_type : account_type,
                address:{
                    country: data.address.country
                }
            })
        
            user.save((err,res)=>{
                if (err) throw err;
                console.log('Create user success');
            })
        }
        else
            console.log('Invalid');
    }); 
}


getUser=function(data){
    return UserModel.findOne({'username':data.username,'password':data.password});
}

getQuestionBank = function(data){
    console.log(data.user_info);
    return Question.find({owner:data._id});
}

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
}

exports.DBProcedure={
    userSignup: userSignup,
    validateSignup:validateSignup,
    getUser:getUser,
    getQuestionBank:getQuestionBank,
    createQuestion:createQuestion
}




