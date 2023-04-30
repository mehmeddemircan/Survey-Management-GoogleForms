import { combineReducers } from "redux";
import { ADD_OPTION, CREATE_QUESTION_FAIL, CREATE_QUESTION_REQUEST, CREATE_QUESTION_RESET, CREATE_QUESTION_SUCCESS, DELETE_QUESTION_FAIL, DELETE_QUESTION_REQUEST, DELETE_QUESTION_RESET, DELETE_QUESTION_SUCCESS, GET_ALL_QUESTION_FAIL, GET_ALL_QUESTION_REQUEST, GET_ALL_QUESTION_SUCCESS, UPDATE_QUESTION_FAIL, UPDATE_QUESTION_REQUEST, UPDATE_QUESTION_RESET, UPDATE_QUESTION_SUCCESS } from "../constants/QuestionConstants";


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

  const CREATE_QUESTION_INITIAL_STATE = {
    message : ""
  };
  export const createQuestionReducer = (
    state = CREATE_QUESTION_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case CREATE_QUESTION_REQUEST:
        return { ...state, loading: true };
  
      case CREATE_QUESTION_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          message : action.payload.message
        };
  
      case CREATE_QUESTION_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload.error,
        };
      
        case CREATE_QUESTION_RESET:
          return {
            ...CREATE_QUESTION_INITIAL_STATE
           
          };
      default:
        return state;
    }
  };


  const DELETE_UPDATE_QUESTION_INITIAL_STATE = {
    
    message : null,
    isDeleted : false ,
    isUpdated : false ,
}
  export const deleteUpdateQuestionReducer = (
    state = DELETE_UPDATE_QUESTION_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case DELETE_QUESTION_REQUEST:
      case UPDATE_QUESTION_REQUEST:
        return { ...state, loading: true };
  
      case DELETE_QUESTION_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: true,
          message : action.payload.message
        };
  
      case UPDATE_QUESTION_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: true,
          message : action.payload.message 
        
        };
  
      case DELETE_QUESTION_FAIL:
      case UPDATE_QUESTION_FAIL:
        return { ...state, error: action.payload.error };
  
      case DELETE_QUESTION_RESET:
        return {
          ...DELETE_UPDATE_QUESTION_INITIAL_STATE
        };
      case UPDATE_QUESTION_RESET:
        return {
          ...DELETE_UPDATE_QUESTION_INITIAL_STATE
        };
      default:
        return state;
    }
  };



  const questionReducer = combineReducers({
    getAllQuestion : getAllQuestionReducer,
    createQuestion : createQuestionReducer,
    deleteUpdateQuestion : deleteUpdateQuestionReducer

  })
  export default questionReducer