import { combineReducers } from "redux";
import { CREATE_SURVEY_FAIL, CREATE_SURVEY_REQUEST, CREATE_SURVEY_RESET, CREATE_SURVEY_SUCCESS, DELETE_SURVEY_FAIL, DELETE_SURVEY_REQUEST, DELETE_SURVEY_RESET, DELETE_SURVEY_SUCCESS, GET_ALL_SURVEY_FAIL, GET_ALL_SURVEY_REQUEST, GET_ALL_SURVEY_SUCCESS, GET_SINGLE_SURVEY_FAIL, GET_SINGLE_SURVEY_PREVIEW_FAIL, GET_SINGLE_SURVEY_PREVIEW_REQUEST, GET_SINGLE_SURVEY_PREVIEW_SUCCESS, GET_SINGLE_SURVEY_REQUEST, GET_SINGLE_SURVEY_SUCCESS, SEARCH_SURVEYS_FAIL, SEARCH_SURVEYS_REQUEST, SEARCH_SURVEYS_RESET, SEARCH_SURVEYS_SUCCESS, SEND_SURVEY_TO_EMAIL_FAIL, SEND_SURVEY_TO_EMAIL_REQUEST, SEND_SURVEY_TO_EMAIL_RESET, SEND_SURVEY_TO_EMAIL_SUCCESS, SUBMIT_SURVEY_FAIL, SUBMIT_SURVEY_REQUEST, SUBMIT_SURVEY_RESET, SUBMIT_SURVEY_SUCCESS, UPDATE_SURVEY_FAIL, UPDATE_SURVEY_REQUEST, UPDATE_SURVEY_RESET, UPDATE_SURVEY_SUCCESS } from "../constants/SurveyConstants";


const GET_ALL_SURVEY_INITIAL_STATE = {
    surveys : [],
    totalSurveys : 0 
  };
  export const getAllSurveyReducer = (
    state = GET_ALL_SURVEY_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case GET_ALL_SURVEY_REQUEST:
        return { ...state, loading: true };
  
      case GET_ALL_SURVEY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          totalSurveys  :action.payload.totalSurveys,
          surveys: action.payload.data,
        };
  
      case GET_ALL_SURVEY_FAIL:
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

  const CREATE_SURVEY_INITIAL_STATE = {
    survey : {},
    message : ""
  };
  export const createSurveyReducer = (
    state = CREATE_SURVEY_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case CREATE_SURVEY_REQUEST:
        return { ...state, loading: true };
  
      case CREATE_SURVEY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          survey : action.payload.data,
          message : action.payload.message
        };
  
      case CREATE_SURVEY_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload.error,
        };
      
        case CREATE_SURVEY_RESET:
          return {
            ...CREATE_SURVEY_INITIAL_STATE
           
          };
      default:
        return state;
    }
  };

  const DELETE_UPDATE_SURVEY_INITIAL_STATE = {
    
    message : null,
    isDeleted : false ,
    isUpdated : false ,
}
  export const deleteUpdateSurveyReducer = (
    state = DELETE_UPDATE_SURVEY_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case DELETE_SURVEY_REQUEST:
      case UPDATE_SURVEY_REQUEST:
        return { ...state, loading: true };
  
      case DELETE_SURVEY_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: true,
          message : action.payload.message
        };
  
      case UPDATE_SURVEY_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: true,
          message : action.payload.message 
        
        };
  
      case DELETE_SURVEY_FAIL:
      case UPDATE_SURVEY_FAIL:
        return { ...state, error: action.payload.error };
  
      case DELETE_SURVEY_RESET:
        return {
          ...DELETE_UPDATE_SURVEY_INITIAL_STATE
        };
      case UPDATE_SURVEY_RESET:
        return {
          ...DELETE_UPDATE_SURVEY_INITIAL_STATE
        };
      default:
        return state;
    }
  };
const SEARCH_SURVEYS_INITIAL_STATE = {surveys : [] , message : null}
  export const searchSurveysReducer = (
    state = SEARCH_SURVEYS_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case SEARCH_SURVEYS_REQUEST:
        return { ...state, loading: true };
  
      case SEARCH_SURVEYS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          
          surveys: action.payload.surveys,
        };
  
      case SEARCH_SURVEYS_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
        case SEARCH_SURVEYS_RESET : 
        return {
            ...SEARCH_SURVEYS_INITIAL_STATE 
        }

      default:
        return state;
    }
  };


  const GET_SINGLE_SURVEY_PREVIEW_INITIAL_STATE = {
    survey : {},
 
  };
  export const getSingleSurveyPreviewReducer = (
    state = GET_SINGLE_SURVEY_PREVIEW_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case GET_SINGLE_SURVEY_PREVIEW_REQUEST:
        return { ...state, loading: true };
  
      case GET_SINGLE_SURVEY_PREVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          survey: action.payload.data,
        };
  
      case GET_SINGLE_SURVEY_PREVIEW_FAIL:
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
      case SUBMIT_SURVEY_RESET : 
        return {
          ...state,
          success : false 
        }
      default:
        return state;
    }
  };


  export const sendSurveyToEmailReducer = (
    state = {message: null},
    action
  ) => {
    switch (action.type) {
      case SEND_SURVEY_TO_EMAIL_REQUEST:
        return { ...state, loading: true };
  
      case SEND_SURVEY_TO_EMAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          message: action.payload.message,
        };
  
      case SEND_SURVEY_TO_EMAIL_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload.error,
        };
      case SEND_SURVEY_TO_EMAIL_RESET:
          return {
            ...state,
            success: false
          };
      default:
        return state;
    }
  };
const surveyReducer = combineReducers({
    getAllSurvey : getAllSurveyReducer,
    createSurvey : createSurveyReducer,
    deleteUpdateSurvey : deleteUpdateSurveyReducer,
    searchSurveys: searchSurveysReducer,
    getSingleSurvey : getSingleSurveyReducer,
    getSingleSurveyPreview : getSingleSurveyPreviewReducer,
    submitSurvey : submitSurveyReducer,
    sendSurveyToEmail : sendSurveyToEmailReducer
})

export default surveyReducer