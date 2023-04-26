const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Category = require("../models/Category");
const Survey = require("../models/Survey");


exports.createCategory = async (req, res) => {
    try {
      const { name } = req.body; // Talep gövdesinden kategori adını al
      const newCategory = new Category({ name }); // Yeni bir Category nesnesi oluştur
      const category = await newCategory.save(); // Yeni kategoriyi veritabanına kaydet
     
    
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

// Tüm kategorileri getirme
exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find(); // Tüm kategorileri veritabanından getir
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

exports.updateCategory = catchAsyncErrors(async(req,res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({message : 'Anket bulunamadi !'})
        }
        await Category.findByIdAndUpdate(req.params.id,{$set: req.body},{new : true })
        res.status(200).json({message : 'Anket Basariyla güncellendi'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Kategori silme
exports.deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id; // URL parametresinden kategori ID'sini al
      const deletedCategory = await Category.findByIdAndDelete(categoryId); // Kategoriyi veritabanından sil
      if (!deletedCategory) {
        return res.status(404).json({ success: false, error: 'Kategori bulunamadı' });
      }
  
      res.status(200).json({ message : 'Basariyla silindi' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };