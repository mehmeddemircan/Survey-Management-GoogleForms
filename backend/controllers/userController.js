const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const cloudinary = require("cloudinary");


// butun kullaniciları sayfa şeklinde getirme işlemi 
exports.getAllUser = catchAsyncErrors(async(req,res) => {
 
    try {
       
        const { page = 1, limit = 10 } = req.query;
    

        const skip = (parseInt(page) - 1) * parseInt(limit);
    
   
        const totalUsers = await User.countDocuments();
    
   
        const users = await User.find().skip(skip).limit(parseInt(limit))
    
        res.status(200).json({ data: users, totalUsers });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

})

// kullaniciyi silme veya hesabi silme 
exports.deleteUser = catchAsyncErrors(async(req,res) => {
  try {

    await User.findByIdAndDelete(req.params.id) 

    res.status(200).json({message : 'Kullanici Basariyla silindi'})
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})



// Şu anki kullanicin profilini getir /api/profile/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Private route, Kullanicin önce giriş yapacak şekilde hesabi güncelleme   => /api/profile/update
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    // Fotograf oldugunu kontrol et
    if (req.body.avatar) {
      // resimi yükleme işlemi 
      const result = await cloudinary.uploader.upload(req.body.avatar);
      user.avatar.url = result.secure_url;
      user.avatar.public_id = result.public_id;
    }

    const updatedUser = await user.save();

    sendToken(updatedUser, 200, res, "Başarılı Şekilde profil güncellenmiştir");
  } else {
  
    res.status(404).json({
      success: false,
      error: "Kullanıcı bulunamadı , güncelleme olmadı ",
    });
  }
});


// anketi kullanıcın favorilerine ekleme işlemi 
exports.addSurveyToFavorites = catchAsyncErrors( async (req, res) => {
  const { userId, surveyId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { favorites: surveyId } }, { new: true }).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    return res.status(200).json({ message: 'Anket Başarılı şekilde favorilere eklendi', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// anketi kullanici favorilerinden kaldırma işlemi 
exports.removeFromFavorites = catchAsyncErrors(async (req, res) => {
  const { userId, surveyId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: surveyId } }, { new: true }).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    return res.status(200).json({ message: 'Anket favorilerden çıkarıldı', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// kullanicinin favorilerini getirme işlemi 
exports.getFavoriteSurveys = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate({
      path: 'favorites',
      populate: {
        path: 'createdBy',
        select : '_id firstname lastname'
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    return res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});
