import axios from "axios";
import { CREATE_SURVEY_FAIL, CREATE_SURVEY_REQUEST, CREATE_SURVEY_SUCCESS, DELETE_SURVEY_FAIL, DELETE_SURVEY_REQUEST, DELETE_SURVEY_SUCCESS, GET_ALL_SURVEY_FAIL, GET_ALL_SURVEY_REQUEST, GET_ALL_SURVEY_SUCCESS, GET_SINGLE_SURVEY_FAIL, GET_SINGLE_SURVEY_REQUEST, GET_SINGLE_SURVEY_SUCCESS, SEARCH_SURVEYS_FAIL, SEARCH_SURVEYS_REQUEST, SEARCH_SURVEYS_SUCCESS } from "../constants/SurveyConstants";


export const AllSurvey = (limit,page) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SURVEY_REQUEST,
      });
  
      const { data } = await axios.get(`http://localhost:5000/api/get-surveys?limit=${limit}&page=${page}`);
  
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
  
      const { data } = await axios.post(`http://localhost:5000/api/create-survey`,survey);
  
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
  
      const { data } = await axios.delete(`http://localhost:5000/api/surveys/${surveyId}/delete`);
  
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


  export const SearchSurvey = (title) => async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_SURVEYS_REQUEST,
      });
  
      const { data } = await axios.get(
        `http://localhost:5000/api/surveys/search?title=${title}`
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
        `http://localhost:5000/api/surveys/${surveyId}/details`
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



