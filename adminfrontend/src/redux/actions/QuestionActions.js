import axios from "axios";
import {
  ADD_OPTION,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  GET_ALL_QUESTION_FAIL,
  GET_ALL_QUESTION_REQUEST,
  GET_ALL_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS,
} from "../constants/QuestionConstants";

export const AllQuestionOfSurvey = (surveyId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_QUESTION_REQUEST,
    });

    const { data } = await axios.get(
      `https://akinsoftanketapi.onrender.com/api/surveys/${surveyId}/questions`
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

export const CreateQuestion = (question) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_QUESTION_REQUEST,
    });

    const { data } = await axios.post(
      `https://akinsoftanketapi.onrender.com/api/create-question`,
      question
    );

    dispatch({
      type: CREATE_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_QUESTION_FAIL,
      error: error.response,
    });
  }
};

export const DeleteQuestion = (surveyId, questionId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_QUESTION_REQUEST,
    });

    const { data } = await axios.delete(
      `https://akinsoftanketapi.onrender.com/api/surveys/${surveyId}/questions/${questionId}/delete`
    );

    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QUESTION_FAIL,
      error: error.response,
    });
  }
};


export const UpdateQuestion = (questionId, question) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_QUESTION_REQUEST,
    });

    const { data } = await axios.put(
      `https://akinsoftanketapi.onrender.com/api/questions/${questionId}/update`,question
    );

    dispatch({
      type: UPDATE_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_QUESTION_FAIL,
      error: error.response,
    });
  }
};




