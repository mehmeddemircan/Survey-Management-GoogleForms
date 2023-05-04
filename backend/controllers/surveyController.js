const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Question = require("../models/Question");
const Response = require("../models/Response");
const Survey = require("../models/Survey");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
// Create a new survey
exports.createSurvey = catchAsyncErrors(async (req, res) => {
  try {
    const { title, description, questions ,createdBy} = req.body;
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
      createdBy
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
    // Get page and limit from query parameters
    const { page = 1, limit = 10 } = req.query;

    // Calculate skip value based on page and limit
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count of surveys
    const totalSurveys = await Survey.countDocuments();

    // Get surveys with pagination using skip and limit
    const surveys = await Survey.find()
      .skip(skip)
      .limit(parseInt(limit))
      .select('-questions -responses').populate('createdBy','firstname lastname');

    res.status(200).json({ data: surveys, totalSurveys });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.getSurveyDetails = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id)
      .populate(
        "questions",
        "questionType questionText options isRequired responses"
      )
      .populate('createdBy','firstname lastname')
      .exec();
    res.status(200).json({ data: survey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
        return res.status(400).send(`Soru cevapları eksik. Lütfen tüm soruları cevaplayın.`);
      }
  
      // Cevabı güncelle
      await Question.findByIdAndUpdate(questionId, { $push: { responses: response } });
    }
  
    // Başarılı bir şekilde yanıt verin
    return res.status(200).json({message : 'Cevaplar başarıyla kaydedildi.'});
  } catch (error) {
    res.status(500).json({error : error.message})
  }
});


exports.getSurveyDetailsForUser = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id)
      .populate(
        "questions",
        "questionType questionText options isRequired"
      )
      .exec();
    res.status(200).json({ data: survey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.sendSurveyToEmail = catchAsyncErrors(async (req, res, next) => {

  const {surveyId,email} = req.body 

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Anket bulunamadı ' });
    }
 

      const goToSurvey = `https://akinsoftanket-user.onrender.com/anketler/${surveyId}`

      const message = `
        <h1>Anket Formu </h1>
        <p>Merhaba ${email}</p>
        <p>anketi doldurmak için lütfen linke tıklayınız </p>
        
        <a href=${goToSurvey} clicktracking=off>${goToSurvey}</a>
        `

        try {
          
          await sendEmail({
            to : email,
            subject : "Anket Formu",
            text: message
          })
          res.status(200).json({
            message : `Başarılı Şekilde  ${email} hesabına mail atilmiştir`,
          })
        } catch (error) {
    
          res.status(500).json({
            error : 'Email maalesef gönderilmemiştir'
          })

        }

  } catch (error) {
      next(error)
  }

})