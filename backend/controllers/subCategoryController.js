const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SubCategory = require("../models/SubCategory");


// Create a new subcategory
exports.createSubCategory = catchAsyncErrors(async(req,res) => {
    try {
        const {name,parent} = req.body
        const newSubCategory = new SubCategory({
            name,
            parent
        })

        await newSubCategory.save()

        res.status(200).json({message : 'Basarıyla altkategori oluşturuldu'})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})
    


// Get all subcategories
exports.getAllSubCategories = catchAsyncErrors(async(req,res) => {
    try {
        const subcategories = await SubCategory.find()
        res.status(200).json({success : true , data : subcategories})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

exports.getSubCategoriesByCategory = catchAsyncErrors(async(req,res) => {
    try {
        const subcategories = await SubCategory.find({parent : req.body.parent})
        res.status(200).json({success : true , data : subcategories})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
})


exports.updateSubCategory = catchAsyncErrors(async(req,res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id)
        if (!subCategory) {
            return res.status(404).json({message : 'AltKategori bulunamadi !'})
        }
        await SubCategory.findByIdAndUpdate(req.params.id,{$set: req.body},{new : true })
        res.status(200).json({message : 'AltKategori Basariyla güncellendi'})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

exports.deleteSubCategory = catchAsyncErrors(async(req,res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id)

        res.status(200).json({message : 'Basariyla alt kategory silindi '})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
})