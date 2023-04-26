const mongoose = require("mongoose");
const { ObjectId } = mongoose;
// Yanıt Modeli
const responseSchema = new mongoose.Schema(
  {
    survey : {
        type : ObjectId,
        ref : 'Survey',
        required : true 
    },
    // Soru referansı
   responses : [
 {
    question: {
        type: ObjectId,
        ref: "Question",
        required: true,
      }, 
      response : {
          type : String,
        
        }
 }
    ]

       
        
       
    
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
