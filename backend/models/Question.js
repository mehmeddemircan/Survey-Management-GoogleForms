
var mongoose = require("mongoose");
const { ObjectId } = mongoose;
// Soru Modeli
const questionSchema = new mongoose.Schema(
  {
    surveyId: {
      type: ObjectId,
      ref: "Survey",
      required: true,
    }, // Anket referansı
     // Soru tipi (kısa yanıt, paragraf, çoktan seçmeli, vb.)
    questionType: { 
        type: String,
        enum: ['coktanSecmeli', 'kisaYanit', 'uzunYanit'],
        required: true 
    },
    // Soru metni
    questionText: { 
        type: String, 
        required: true 
    }, 
    // Seçenekler (sadece çoktan seçmeli sorular için)
    options: [
        { 
            type: String 
        }
    ],
    isRequired :  {
        type: Boolean,
        default : false 
    },
    
  },
  { timestamps: true }
);

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
