//replace modelSchema,ModelName with whatever you want
var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
var subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    parent : {
        type : ObjectId,
        ref : 'Category',
        required : true 
    }
},{timestamps : true });

var SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;