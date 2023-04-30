import { combineReducers } from "redux";
import {
  ADD_SURVEY_TO_FAVORITE_FAIL,
  ADD_SURVEY_TO_FAVORITE_REQUEST,
  ADD_SURVEY_TO_FAVORITE_RESET,
  ADD_SURVEY_TO_FAVORITE_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  GET_ALL_FAVORITES_FAIL,
  GET_ALL_FAVORITES_REQUEST,
  GET_ALL_FAVORITES_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  REMOVE_SURVEY_FROM_FAVORITE_FAIL,
  REMOVE_SURVEY_FROM_FAVORITE_REQUEST,
  REMOVE_SURVEY_FROM_FAVORITE_RESET,
  REMOVE_SURVEY_FROM_FAVORITE_SUCCESS,
} from "../constants/UserConstants";

const GET_ALL_USER_INITIAL_STATE = {
  users: [],
  totalUsers: 0,
};
export const getAllUserReducer = (
  state = GET_ALL_USER_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return { ...state, loading: true };

    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        totalUsers: action.payload.totalUsers,
        users: action.payload.data,
      };

    case GET_ALL_USER_FAIL:
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

const DELETE_UPDATE_USER_INITIAL_STATE = {
  message: null,
  isDeleted: false,
  isUpdated: false,
};
export const deleteUpdateUserReducer = (
  state = DELETE_UPDATE_USER_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.payload.message,
      };

    case DELETE_USER_FAIL:
      return { ...state, error: action.payload };

    case DELETE_USER_RESET:
      return {
        ...DELETE_UPDATE_USER_INITIAL_STATE,
      };
    default:
      return state;
  }
};

export const getUserFavoritesReducer = (
  state = {
    data: {
      favorites: [],
    },
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_FAVORITES_REQUEST:
      return { ...state, loading: true };

    case GET_ALL_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,

        data: action.payload,
      };

    case GET_ALL_FAVORITES_FAIL:
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

export const addRemoveFavoriteReducer = (
  state = {
    message: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_SURVEY_TO_FAVORITE_REQUEST:
    case REMOVE_SURVEY_FROM_FAVORITE_REQUEST:
      return { ...state, loading: true };

    case ADD_SURVEY_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        message: action.payload.message,
      };

    case REMOVE_SURVEY_FROM_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        isRemoved: true,
        message: action.payload.message,
      };
    case ADD_SURVEY_TO_FAVORITE_FAIL:
    case REMOVE_SURVEY_FROM_FAVORITE_FAIL:
      return {
        ...state,
        loading: false,
        isAdded: false,
        error: action.payload.error,
      };

    case REMOVE_SURVEY_FROM_FAVORITE_FAIL:
      return {
        ...state,
        loading: false,
        isRemoved: false,
        error: action.payload.error,
      };
    case ADD_SURVEY_TO_FAVORITE_RESET:
      return {
        ...state,
        isAdded: false,
      };

    case REMOVE_SURVEY_FROM_FAVORITE_RESET:
      return {
        ...state,
        isRemoved: false,
      };
    default:
      return state;
  }
};

const userReducer = combineReducers({
  getAllUser: getAllUserReducer,
  deleteUpdateUser: deleteUpdateUserReducer,
  getUserFavorites: getUserFavoritesReducer,
  addRemoveFavorite : addRemoveFavoriteReducer
});

export default userReducer;
