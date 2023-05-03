import { GET_ALL_QUESTION_FAIL, GET_ALL_QUESTION_REQUEST, GET_ALL_QUESTION_SUCCESS, GET_SINGLE_SURVEY_FAIL, GET_SINGLE_SURVEY_REQUEST, GET_SINGLE_SURVEY_SUCCESS, SUBMIT_SURVEY_FAIL, SUBMIT_SURVEY_REQUEST, SUBMIT_SURVEY_SUCCESS } from "../constants/SurveyConstants";
import { combineReducers } from "redux";
const GET_SINGLE_SURVEY_INITIAL_STATE = {
    survey : {},
 
  };
  export const getSingleSurveyReducer = (
    state = GET_SINGLE_SURVEY_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case GET_SINGLE_SURVEY_REQUEST:
        return { ...state, loading: true };
  
      case GET_SINGLE_SURVEY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          survey: action.payload.data,
        };
  
      case GET_SINGLE_SURVEY_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const GET_ALL_QUESTION_INITIAL_STATE = {
    data : {
        questions : []
    } ,
 
  };
  export const getAllQuestionReducer = (
    state = GET_ALL_QUESTION_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case GET_ALL_QUESTION_REQUEST:
        return { ...state, loading: true };
  
      case GET_ALL_QUESTION_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          data: action.payload,
        };
  
      case GET_ALL_QUESTION_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


  const SUBMIT_SURVEY_INITIAL_STATE = {
    message : null
 
  };
  export const submitSurveyReducer = (
    state = SUBMIT_SURVEY_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case SUBMIT_SURVEY_REQUEST:
        return { ...state, loading: true };
  
      case SUBMIT_SURVEY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          message: action.payload.message,
        };
  
      case SUBMIT_SURVEY_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };


const surveyReducer = combineReducers({
    getSingleSurvey :getSingleSurveyReducer,
    getAllQuestion : getAllQuestionReducer,
    submitSurvey: submitSurveyReducer
})

export default surveyReducer