const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Question = require("../models/Question");
const Survey = require("../models/Survey");

// soru oluşturma controller
exports.createQuestion = catchAsyncErrors(async (req, res) => {
  const { surveyId, questionType, questionText, options, isRequired } =
    req.body;

  try {
    const newQuestion = new Question({
      surveyId,
      questionType,
      questionText,
      options,
      isRequired,
    });

    await newQuestion.save();
    const survey = await Survey.findById(surveyId);
    // anketin sorularına soru id sini ekleme 
    survey.questions.push(newQuestion);
    await survey.save();

    return res
      .status(201)
      .json({ message: "Soru başarıyla oluşturuldu", question: newQuestion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Soru oluşturma başarısız" });
  }
});

// sorunun  gerekliliğini değiştirme
exports.toggleQuestionIsRequired = catchAsyncErrors(async (req, res) => {
  const { questionId } = req.params; 

  try {
   
    const question = await Question.findById(questionId);

  
    if (!question) {
      return res.status(404).json({ error: "Soru bulunamadı" });
    }

  
    question.isRequired = !question.isRequired;

 
    await question.save();

  
    return res.status(200).json({
      question,
      message: "Sorunun zorunlu alan gerekliliği güncellendi",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "İç sunucu hatası" });
  }
});

// soru silme işlemi
exports.deleteQuestion = catchAsyncErrors(async (req, res) => {
  const { surveyId, questionId } = req.params;

  try {

    const question = await Question.findById(questionId);

  
    if (!question) {
      return res.status(404).json({ error: "Soru bulunamadı" });
    }


    const survey = await Survey.findById(surveyId);


    if (!survey) {
      return res.status(404).json({ error: "Anket bulunamadı" });
    }

    // anket sorularındaki indeksi bulma 
    const questionIndex = survey.questions.findIndex(
      (question) => question.toString() === questionId
    );


    if (questionIndex === -1) {
      return res
        .status(404)
        .json({ error: "Ankette istediğiniz soru bulunamadı" });
    }


    survey.questions.splice(questionIndex, 1);

    //anketi güncelle
    await survey.save();

    //Soruyu id ye göre sil 
    await Question.findByIdAndDelete(questionId);

    // başarılı mesajı
    return res.status(200).json({ message: "Soru başarıyla silindi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "İç sunucu hatası" });
  }
});
// anketin sorularını getirme
exports.getSurveyQuestions = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId).populate(
      "questions",
      "questionType questionText options isRequired responses"
    ); 
    if (!survey) {
      return res.status(404).json({ message: "Anket bulunamadı !" });
    }
    const questions = survey.questions; 
    return res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// soruyu güncelle
exports.updateQuestion = catchAsyncErrors(async (req, res) => {
  try {
    await Question.findByIdAndUpdate(
      req.params.questionId,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({ message: "Soru başariyla güncellendi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// tek bir sorunun detaylarını getirme 
exports.getSingleQuestion = catchAsyncErrors(async(req,res) => {
  try {

    const question = await Question.findById(req.params.questionId)

    return res.status(200).json({
      question : question
    })

  } catch (error) {
    res.status(500).json({error : error.message})
  }
})

