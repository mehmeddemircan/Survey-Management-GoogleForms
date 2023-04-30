const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Question = require("../models/Question");
const Response = require("../models/Response");
const Survey = require("../models/Survey");
const cloudinary = require('cloudinary')
// Create a new survey
exports.createSurvey = catchAsyncErrors(async (req, res) => {
  try {
    const { title, description,category, questions, responses } = req.body;

    const result = await cloudinary.uploader.upload(req.body.image);
    
    const image = result.secure_url;
    

    const survey = new Survey({
      title,
      description,
      category,
      image,
      questions,
      responses,
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
        const surveys = await Survey.find().skip(skip).limit(parseInt(limit)).select('title description image');
    
        res.status(200).json({ data: surveys, totalSurveys });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

exports.getSurveyDetails  = catchAsyncErrors(async(req,res) => {
    try {
        const survey = await Survey.findById(req.params.id).populate('questions','questionType questionText options isRequired responses').exec()
        res.status(200).json({data : survey})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

exports.deleteSurvey = catchAsyncErrors(async(req,res) => {
    try {
        const survey = await Survey.findById(req.params.id)
        if (!survey) {
            return res.status(404).json({error : 'Anket bulunamadı '})
        }
        await Survey.findByIdAndDelete(req.params.id)
        res.status(200).json({message : 'Anket başarıyla silindi '})
    } catch (error) {
        res.status(500).json({error : error.message})
    }

})



  exports.updateSurvey = catchAsyncErrors(async(req,res) => {
    try {
        const survey = await Survey.findById(req.params.id)
        if (!survey) {
            return res.status(404).json({message : 'Anket bulunamadi !'})
        }
        await Survey.findByIdAndUpdate(req.params.id,{$set: req.body},{new : true })
        res.status(200).json({message : 'Anket Basariyla güncellendi'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
  })


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


  exports.addQuestionsToSurvey =  catchAsyncErrors(async (req, res) => {
    const { surveyId, questions } = req.body;
  
    try {
      const survey = await Survey.findById(surveyId);
  
      if (!survey) {
        return res.status(404).json({ error: 'Survey not found' });
      }
  
      const createdQuestions = [];
  
      for (const question of questions) {
        const newQuestion = new Question(question);
        await newQuestion.save();
        createdQuestions.push(newQuestion._id);
      }
  
      survey.questions.push(...createdQuestions);
      await survey.save();
  
      res.status(200).json({ message: 'Questions added successfully', survey });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
