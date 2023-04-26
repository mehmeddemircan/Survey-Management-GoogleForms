const Response = require("../models/Response");
const Survey = require("../models/Survey");


exports.createResponse = async (req, res) => {
  try {
    const { survey, responses } = req.body; // Talep gövdesinden kullanıcı bilgilerini ve yanıtları al
    const newResponse = new Response({survey, responses }); // Yeni bir Response nesnesi oluştur
    const savedResponse = await newResponse.save(); // Yeni yanıtı veritabanına kaydet

     await Survey.findByIdAndUpdate(
      survey,
      { $push: { responses: savedResponse._id } }, // responses alanına yanıt ID'sini ekleyin
      { new: true }
    );

    res.status(201).json({ success: true, data: savedResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tüm yanıtları getirme (READ)
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find({survey : req.params.surveyId}).populate('responses.question','questionText options isRequired'); // Tüm yanıtları getir
    res.status(200).json({ success: true, data: responses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

