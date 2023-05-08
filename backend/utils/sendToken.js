

// token oluştur ve cookie kaydet
const sendToken = (user, statusCode, res , message ) => {
    // Jwt token oluşturma 
    const token = user.getJwtToken();
  
    res.status(statusCode).json({
         success: true, 
         token ,
         user,
         message : message       
      });
  };
  module.exports= sendToken;