
import axios from "axios";
import { ADD_SURVEY_TO_FAVORITE_FAIL, ADD_SURVEY_TO_FAVORITE_REQUEST, ADD_SURVEY_TO_FAVORITE_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_FAVORITES_FAIL, GET_ALL_FAVORITES_REQUEST, GET_ALL_FAVORITES_SUCCESS, GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, REMOVE_SURVEY_FROM_FAVORITE_FAIL, REMOVE_SURVEY_FROM_FAVORITE_REQUEST, REMOVE_SURVEY_FROM_FAVORITE_SUCCESS } from "../constants/UserConstants";

// getirme işlemi
export const AllUser = (limit,page) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_USER_REQUEST,
      });
  
      const { data } = await axios.get(`http://localhost:5000/api/users?limit=${limit}&page=${page}`);
  
      dispatch({
        type: GET_ALL_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_USER_FAIL,
        error: error.response,
      });
    }
  };

// silme id ye göre
export const DeleteUser = (userId) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_USER_REQUEST,
      });
  
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${userId}/delete`
      );
  
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        error: error.response,
      });
    }
  };


export const GetSurveyFavorites = (userId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_FAVORITES_REQUEST,
      });
  
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${userId}/favorites`
      );
  
      dispatch({
        type: GET_ALL_FAVORITES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_FAVORITES_FAIL,
        error: error.response,
      });
    }
  };

  export const AddSurveyToFavorite = (userId,surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_SURVEY_TO_FAVORITE_REQUEST,
      });
  
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${userId}/surveys/${surveyId}/add-favorite`
      );
  
      dispatch({
        type: ADD_SURVEY_TO_FAVORITE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_SURVEY_TO_FAVORITE_FAIL,
        error: error.response,
      });
    }
  };

  export const RemoveSurveyFromFavorite = (userId,surveyId) => async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_SURVEY_FROM_FAVORITE_REQUEST,
      });
  
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${userId}/surveys/${surveyId}/remove-favorite`
      );
  
      dispatch({
        type: REMOVE_SURVEY_FROM_FAVORITE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_SURVEY_FROM_FAVORITE_FAIL,
        error: error.response,
      });
    }
  };