import axios from "axios";
import { CREATE_SURVEY_FAIL, CREATE_SURVEY_REQUEST, CREATE_SURVEY_SUCCESS, DELETE_SURVEY_FAIL, DELETE_SURVEY_REQUEST, DELETE_SURVEY_SUCCESS, GET_ALL_SURVEY_FAIL, GET_ALL_SURVEY_REQUEST, GET_ALL_SURVEY_SUCCESS, GET_SINGLE_SURVEY_FAIL, GET_SINGLE_SURVEY_PREVIEW_FAIL, GET_SINGLE_SURVEY_PREVIEW_REQUEST, GET_SINGLE_SURVEY_PREVIEW_SUCCESS, GET_SINGLE_SURVEY_REQUEST, GET_SINGLE_SURVEY_SUCCESS, SEARCH_SURVEYS_FAIL, SEARCH_SURVEYS_REQUEST, SEARCH_SURVEYS_SUCCESS, SEND_SURVEY_TO_EMAIL_FAIL, SEND_SURVEY_TO_EMAIL_REQUEST, SEND_SURVEY_TO_EMAIL_SUCCESS, SUBMIT_SURVEY_FAIL, SUBMIT_SURVEY_REQUEST, SUBMIT_SURVEY_SUCCESS, UPDATE_SURVEY_FAIL, UPDATE_SURVEY_REQUEST, UPDATE_SURVEY_SUCCESS } from "../constants/SurveyConstants";


export const AllSurvey = (limit,page) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SURVEY_REQUEST,
      });
  
      const { data } = await axios.get(`https://akinsoftanketapi.onrender.com/api/get-surveys?limit=${limit}&page=${page}`);
  
      dispatch({
        type: GET_ALL_SURVEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SURVEY_FAIL,
        error: error.response,
      });
    }
  };

  export const CreateSurvey = (survey) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SURVEY_REQUEST,
      });
  
      const { data } = await axios.post(`https://akinsoftanketapi.onrender.com/api/create-survey`,survey);
  
      dispatch({
        type: CREATE_SURVEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SURVEY_FAIL,
        error: error.response,
      });
    }
  };


  export const DeleteSurvey = (surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SURVEY_REQUEST,
      });
  
      const { data } = await axios.delete(`https://akinsoftanketapi.onrender.com/api/surveys/${surveyId}/delete`);
  
      dispatch({
        type: DELETE_SURVEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_SURVEY_FAIL,
        error: error.response,
      });
    }
  };

  export const UpdateSurvey = (surveyId,survey) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SURVEY_REQUEST,
      });
  
      const { data } = await axios.put(`https://akinsoftanketapi.onrender.com/api/surveys/${surveyId}/update`,survey);
  
      dispatch({
        type: UPDATE_SURVEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SURVEY_FAIL,
        error: error.response,
      });
    }
  };


  export const SearchSurvey = (title) => async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_SURVEYS_REQUEST,
      });
  
      const { data } = await axios.get(
        `https://akinsoftanketapi.onrender.com/api/surveys/search?title=${title}`
      );
  
      dispatch({
        type: SEARCH_SURVEYS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_SURVEYS_FAIL,
        error: error.response,
      });
    }
  };
  

  export const GetSingleSurvey = (surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_SURVEY_REQUEST,
      });
  
      const { data } = await axios.get(
        `https://akinsoftanketapi.onrender.com/api/surveys/${surveyId}/details`
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


  

  export const GetSingleSurveyPreview = (surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_SURVEY_PREVIEW_REQUEST,
      });
  
      const { data } = await axios.get(
        `http://localhost:5000/api/user/surveys/${surveyId}/details`
      );
  
      dispatch({
        type: GET_SINGLE_SURVEY_PREVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_SURVEY_PREVIEW_FAIL,
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

  export const SendSurveyToEmail = (emailData) => async (dispatch) => {
    try {
      dispatch({
        type: SEND_SURVEY_TO_EMAIL_REQUEST,
      });
  
      const { data } = await axios.post(
        `http://localhost:5000/api/send-survey`,emailData
      );
  
      dispatch({
        type: SEND_SURVEY_TO_EMAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEND_SURVEY_TO_EMAIL_FAIL,
        error: error.response,
      });
    }
  };


