const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Question = require("../models/Question");

const Survey = require("../models/Survey");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
// yeni anket oluşturma işlemi 
exports.createSurvey = catchAsyncErrors(async (req, res) => {
  try {
    const { title, description, questions, createdBy } = req.body;
    let image;

    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image);
      image = result.secure_url;
    }

    const survey = new Survey({
      title,
      description,
      image,
      questions,
      createdBy,
    });
    await survey.save();
    res
      .status(201)
      .json({ message: "Anket başarıyla oluşturuldu ", data: survey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.getAllSurvey = catchAsyncErrors(async (req, res) => {
  try {
    // page ve limit parametrelerini alma 
    const { page = 1, limit = 10 } = req.query;

    // her sayfa başına ,  toplam anket sayisini hesaplama
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // toplam anket sayisi
    const totalSurveys = await Survey.countDocuments();

   
    const surveys = await Survey.find()
      .skip(skip)
      .limit(parseInt(limit))
      .select("-questions -responses")
      .populate("createdBy", "firstname lastname");

    res.status(200).json({ data: surveys, totalSurveys });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// anket detaylarını getirme 
exports.getSurveyDetails = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id)
      .populate(
        "questions",
        "questionType questionText options isRequired responses"
      )
      .populate("createdBy", "firstname lastname")
      .exec();
    res.status(200).json({ data: survey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// anketi sil 
exports.deleteSurvey = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ error: "Anket bulunamadı " });
    }
    await Survey.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Anket başarıyla silindi " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// anketi güncelle
exports.updateSurvey = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Anket bulunamadi !" });
    }
    await Survey.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Anket Basariyla güncellendi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// anketleri arama yaparak getir
exports.surveySearchQuery = async (req, res) => {
  try {
    const searchQuery = req.query.title;
    const surveys = await Survey.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    res.json({
      surveys,
      message: "Successfully searched",
    });
  } catch (error) {
    res.status(500).send({ message: "Error searching users" });
  }
};

// ankete soru ekle 
exports.addQuestionsToSurvey = catchAsyncErrors(async (req, res) => {
  const { surveyId, questions } = req.body;

  try {
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    const createdQuestions = [];

    for (const question of questions) {
      const newQuestion = new Question(question);
      await newQuestion.save();
      createdQuestions.push(newQuestion._id);
    }

    survey.questions.push(...createdQuestions);
    await survey.save();

    res.status(200).json({ message: "Questions added successfully", survey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// anketi gönder , cevapları kaydet 
exports.submitSurveyAnswers = catchAsyncErrors(async (req, res) => {
  try {
    const surveyId = req.body.surveyId;
    const surveyResponses = req.body;

    // SurveyId'ye ait soruların listesini alın
    const surveyQuestions = await Question.find({ surveyId });

    // Tüm sorular için cevapları kaydedin
    for (let i = 0; i < surveyQuestions.length; i++) {
      const questionId = surveyQuestions[i]._id;
      const response = surveyResponses[questionId];

      if (!response) {
        return res
          .status(400)
          .send(`Soru cevapları eksik. Lütfen tüm soruları cevaplayın.`);
      }

      // Cevabı güncelle
      await Question.findByIdAndUpdate(questionId, {
        $push: { responses: response },
      });
    }

    // Başarılı bir şekilde yanıt verin
    return res.status(200).json({ message: "Cevaplar başarıyla kaydedildi." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kullanici tarafında ki  anket detaylarını getir
exports.getSurveyDetailsForUser = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id)
      .populate("questions", "questionType questionText options isRequired")
      .exec();
    res.status(200).json({ data: survey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kullaniciya anketi mail yoluyla iletme işlemi 
exports.sendSurveyToEmail = catchAsyncErrors(async (req, res, next) => {
  const { surveyId, email } = req.body;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: "Anket bulunamadı " });
    }

    const goToSurvey = `https://akinsoftanket-user.onrender.com/anketler/${surveyId}`;

    const message = `
      <div style="background-color:#F2F2F2; padding:20px;">
     
      <div style="text-align:center">
      <img src="https://www.akinsoft.com.tr/logo/images/akinsoft_dikey_logo.jpg" />
      </div>
     
      <h1 style="text-align:center; color:#008CBA; font-size:36px; font-weight:bold;">Anket Formu</h1>
      <p style="font-size:16px; color:#666; line-height:22px; text-align:center;">Merhaba ${email},<br>
      Anketimizi doldurmak için aşağıdaki linke tıklayabilirsiniz:</p>
      <div style="text-align:center;">
        <a href=${goToSurvey} style="display:inline-block; background-color:#008CBA; color:#FFF; padding:10px 20px; font-size:18px; text-decoration:none; border-radius:5px;">Ankete Git</a>
      </div>
      </div>
      </div>
    </div>
        `;

    try {
      await sendEmail({
        to: email,
        subject: "Anket Formu",
        text: message,
      });
      res.status(200).json({
        message: `Başarılı Şekilde  ${email} hesabına mail atilmiştir`,
      });
    } catch (error) {
      res.status(500).json({
        error: "Email maalesef gönderilmemiştir",
      });
    }
  } catch (error) {
    next(error);
  }
});
