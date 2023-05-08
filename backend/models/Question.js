
var mongoose = require("mongoose");
const { ObjectId } = mongoose;
// Soru Modeli
const questionSchema = new mongoose.Schema(
  {
     // Anket referansı
    surveyId: {
      type: ObjectId,
      ref: "Survey",
      required: true,
    },
     // Soru tipi (kısa yanıt, paragraf, çoktan seçmeli, vb.)
    questionType: { 
        type: String,
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
    // string yanıt dizisi 
    responses : [
      {
        type : String
      }
    ]
  },
  { timestamps: true }
);

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
