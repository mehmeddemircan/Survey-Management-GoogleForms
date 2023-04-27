
import axios from "axios";
import { DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "../constants/UserConstants";

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