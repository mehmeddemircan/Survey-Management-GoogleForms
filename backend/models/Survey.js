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
    category : {
      type : ObjectId,
      ref : 'Category'
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
    // Yanıt referansları (Response modeline referans) 
    responses: [
        { 
        type: ObjectId,
        ref: "Response" 
        }
   ], 
  },
  { timestamps: true }
);

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
