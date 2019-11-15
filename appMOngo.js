const mongooseOJ = require('./mongodbQuery.js');
const mongoose = mongooseOJ.mongoose;
const Kitten = mongooseOJ.Kitten;


// Kitten.find({name:'abuas'},function (err, res) {
//     if (err) return console.error(err);
//     console.log(res);
//   })    

// fluffy.speak();
// fluffy.save(function(err,res){
//     if(err) throw err;

// })


// var fluffy = new Kitten({name: 'abuas'});
// fluffy.save((err,res)=>{
//     if(err) throw err;
//     console.log(res);
// })  