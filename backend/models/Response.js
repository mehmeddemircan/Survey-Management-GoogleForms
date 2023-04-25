const mongoose = require("mongoose");
const { ObjectId } = mongoose;
// Yanıt Modeli
const responseSchema = new mongoose.Schema(
  {
    // Anket referansı
    surveyId: { 
        type: ObjectId, 
        ref: "Survey", 
        required: true 
    }, 
    // Soru referansı
    questionId: {
      type: ObjectId,
      ref: "Survey",
      required: true,
    }, 
    // Yanıt içeriği
    response: [{ 
        type: String 
    }], 
    // Eğer farklı soru tiplerine göre farklı alanlar tutulacaksa, burada gerekli alanlar eklenebilir
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
