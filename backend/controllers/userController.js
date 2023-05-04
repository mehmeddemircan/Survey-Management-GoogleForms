const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const cloudinary = require("cloudinary");



exports.getAllUser = catchAsyncErrors(async(req,res) => {
 
    try {
        // Get page and limit from query parameters
        const { page = 1, limit = 10 } = req.query;
    
        // Calculate skip value based on page and limit
        const skip = (parseInt(page) - 1) * parseInt(limit);
    
        // Get total count of surveys
        const totalUsers = await User.countDocuments();
    
        // Get surveys with pagination using skip and limit
        const users = await User.find().skip(skip).limit(parseInt(limit))
    
        res.status(200).json({ data: users, totalUsers });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

})

exports.deleteUser = catchAsyncErrors(async(req,res) => {
  try {

    await User.findByIdAndDelete(req.params.id) 

    res.status(200).json({message : 'Kullanici Basariyla silindi'})
  } catch (error) {
    res.status(500).json({error : error.message})
  }
})



// Get currently logged in user details   =>   /api/profile/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user profile private route   => /api/profile/update
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    // Check if an image is uploaded
    if (req.body.avatar) {
      // Upload image to cloudinary and update user avatar with the uploaded image URL and public ID
      const result = await cloudinary.uploader.upload(req.body.avatar);
      user.avatar.url = result.secure_url;
      user.avatar.public_id = result.public_id;
    }

    const updatedUser = await user.save();

    sendToken(updatedUser, 200, res, "Successfully updated account");
  } else {
    // return next(new ErrorHandler('User not found , not updated '))
    res.status(404).json({
      success: false,
      error: "User not found ,not updated",
    });
  }
});



exports.addSurveyToFavorites = catchAsyncErrors( async (req, res) => {
  const { userId, surveyId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { favorites: surveyId } }, { new: true }).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Survey added to favorites', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

exports.removeFromFavorites = async (req, res) => {
  const { userId, surveyId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: surveyId } }, { new: true }).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Survey removed from favorites', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavoriteSurveys = async (req, res) => {
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
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
