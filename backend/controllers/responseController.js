const Response = require("../models/Response");
const Survey = require("../models/Survey");

exports.createResponse = async (req, res) => {
    const { surveyId, questionId, response } = req.body;
  
    try {
      // Create a new response object
      const newResponse = new Response({
        surveyId,
        questionId,
        response
      });
  
      // Save the new response
      await newResponse.save();

        // Retrieve the Survey object
    const survey = await Survey.findById(surveyId);
  
        // Push the Id of the created Response object to the responses array
    survey.responses.push(newResponse._id);
    
        // Save the updated Survey object
    await survey.save();
  
      return res.status(201).json({ message: 'Yanit Başarıyla oluşturuldu', response: newResponse });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create response' });
    }
  };

// Get all responses for a specific survey
exports.getResponsesBySurvey = async (req, res) => {
    const { surveyId } = req.params;
  
    try {
      // Find all responses that belong to the specified survey
      const responses = await Response.find({ surveyId });
  
      return res.status(200).json({ responses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get responses' });
    }
  };
// // Get all responses for a specific question of a specific survey
// exports.getResponsesOfQuestionOfSurvey = async (req, res) => {
//     const { surveyId, questionId } = req.params;
  
//     try {
//       // Find all responses that belong to the specified question and survey
//       const responses = await Response.find({ surveyId, questionId }).populate('surveyId')
  
//       return res.status(200).json({ responses });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Failed to get responses' });
//     }
//   };