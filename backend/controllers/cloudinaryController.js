const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// cloudinary resim yükleme
exports.upload = catchAsyncErrors(async (req, res, next) => {
  let result = await cloudinary.uploader.upload(
    req.body.image,
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );

  res.status(200).json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

// cloudinary resim silme
exports.remove = (req, res, next) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        err,
      });
    }
    res.status(200).json({mesage : "Başarıyla silindi"});
  });
};

// cloudinary resim yükleme 
exports.uploadImage = catchAsyncErrors(async(req,res,next)=> {
   
    let result = await cloudinary.uploader.upload(req.body.image,{
        public_id: `${Date.now()}`,
        resource_type :  "auto"
    })
  
    res.status(200).json({
        public_id : result.public_id,
        url : result.secure_url
    })


})
