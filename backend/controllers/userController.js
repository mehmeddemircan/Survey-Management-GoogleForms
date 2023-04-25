const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");

  // Get currently logged in user details   =>   /api/profile/me
  exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);
  
    res.status(200).json({
        success: true,
        user
    })
    
  })
  
  // update user profile private route   => /api/profile/update
  exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.firstname = req.body.firstname || user.firstname
      user.lastname = req.body.lastname || user.lastname
      user.email = req.body.email || user.email
      if (req.body.password) {
          user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      sendToken(updatedUser,200,res,"Successfully updated account")
    }else {
      // return next(new ErrorHandler('User not found , not updated '))
      res.status(404).json({
        success: false,
        error :'User not found ,not updated'
      })
    }
  
  })