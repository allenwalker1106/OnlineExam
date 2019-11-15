Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost:27017/media',{useNewUrlParser:true,useUnifiedTopology: true});
var db = Mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('Succesfull connect connect');
})
var userSchema = new Mongoose.Schema({
    name:{
        firstName: String,
        middleName:{
            type:String,
            default:""
        },
        lastName: String
    }
})

// kittySchema.methods.speak=function(){
//     var greeting = this.name ? "Meow name is" + this.name : "I don't have a name";
//     console.log(greeting);
// }

// var kitten = Mongoose.model('Kitten',kittySchema);
// exports.Kitten = kitten;
exports.mongoose = Mongoose;

