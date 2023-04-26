//replace modelSchema,ModelName with whatever you want
var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required : true 
    },
   
   
  
},{timestamps : true });

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;