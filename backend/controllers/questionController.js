const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Question = require("../models/Question");
const Survey = require("../models/Survey");

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
    // Update the questions array in the corresponding survey
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

exports.toggleQuestionIsRequired = catchAsyncErrors(async (req, res) => {
  const { questionId } = req.params; // Assuming you have questionId in request params

  try {
    // Find the question by ID
    const question = await Question.findById(questionId);

    // Check if the question exists
    if (!question) {
      return res.status(404).json({ error: "Soru bulunamadı" });
    }

    // Toggle the isRequired field of the question
    question.isRequired = !question.isRequired;

    // Save the updated question
    await question.save();

    // Return the updated question
    return res.status(200).json({
      question,
      message: "Sorunun zorunlu alan gerekliliği güncellendi",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "İç sunucu hatası" });
  }
});

exports.deleteQuestion = catchAsyncErrors(async (req, res) => {
  const { surveyId, questionId } = req.params; // Assuming you have surveyId and questionId in request params

  try {
    // Find the question by ID
    const question = await Question.findById(questionId);

    // Check if the question exists
    if (!question) {
      return res.status(404).json({ error: "Soru bulunamadı" });
    }

    // Find the corresponding survey by ID
    const survey = await Survey.findById(surveyId);

    // Check if the survey exists
    if (!survey) {
      return res.status(404).json({ error: "Anket bulunamadı" });
    }

    // Find the index of the question in the questions array in the survey
    const questionIndex = survey.questions.findIndex(
      (question) => question.toString() === questionId
    );

    // Check if the question exists in the survey
    if (questionIndex === -1) {
      return res
        .status(404)
        .json({ error: "Ankette istediğiniz soru bulunamadı" });
    }

    // Remove the question from the questions array in the survey
    survey.questions.splice(questionIndex, 1);

    // Save the updated survey
    await survey.save();

    // Delete the question
    await Question.findByIdAndDelete(questionId);

    // Return success message
    return res.status(200).json({ message: "Soru başarıyla silindi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "İç sunucu hatası" });
  }
});
exports.getSurveyQuestions = catchAsyncErrors(async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId).populate(
      "questions",
      "questionType questionText options isRequired responses"
    ); // Use Mongoose's findById method to find the survey by its ID, and populate the 'questions' field with the associated questions
    if (!survey) {
      return res.status(404).json({ message: "Anket bulunamadı !" });
    }
    const questions = survey.questions; // Access the questions array from the retrieved survey object
    return res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
