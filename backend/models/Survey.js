const mongoose = require("mongoose");
const { ObjectId } = mongoose;
// Anket Modeli
const surveySchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    }, 
    description: { 
        type: String 
    },
    image : {
      type : String
    },
    // Soru referansları (Question modeline referans)
    questions: [
       {
     
        type : ObjectId,
        ref : 'Question'

       }
    ],
    createdBy : {
      type : ObjectId ,
      ref : 'User',
      required : true 
    }

  },
  { timestamps: true }
);

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
