 
import axios from 'axios'
import { GET_ALL_QUESTION_FAIL, GET_ALL_QUESTION_REQUEST, GET_ALL_QUESTION_SUCCESS, GET_SINGLE_SURVEY_FAIL, GET_SINGLE_SURVEY_REQUEST, GET_SINGLE_SURVEY_SUCCESS, SUBMIT_SURVEY_FAIL, SUBMIT_SURVEY_REQUEST, SUBMIT_SURVEY_SUCCESS } from '../constants/SurveyConstants';


  export const GetSingleSurvey = (surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_SURVEY_REQUEST,
      });
  
      const { data } = await axios.get(
        `http://localhost:5000/api/user/surveys/${surveyId}/details`
      );
  
      dispatch({
        type: GET_SINGLE_SURVEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_SURVEY_FAIL,
        error: error.response,
      });
    }
  };


  export const AllQuestionOfSurvey = (surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_QUESTION_REQUEST,
      });
  
      const { data } = await axios.get(
        `http://localhost:5000/api/surveys/${surveyId}/questions`
      );
  
      dispatch({
        type: GET_ALL_QUESTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_QUESTION_FAIL,
        error: error.response,
      });
    }
  };

  export const SubmitSurveyForm = (response) => async (dispatch) => {
    try {
      dispatch({
        type: SUBMIT_SURVEY_REQUEST,
      });
  
      const { data } = await axios.post(
        `http://localhost:5000/api/submit`,response
      );
  
      dispatch({
        type: SUBMIT_SURVEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBMIT_SURVEY_FAIL,
        error: error.response,
      });
    }
  };


