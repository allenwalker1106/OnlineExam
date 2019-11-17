const mongooseOJ = require('./mongodbQuery.js');
const mongoose = mongooseOJ.mongoose;
const User = mongooseOJ.User;

User.signup();
var test  = new User();
