import { combineReducers } from "redux";
import { DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "../constants/UserConstants";

const GET_ALL_USER_INITIAL_STATE = {
    users : [],
    totalUsers : 0 
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
          totalUsers  :action.payload.totalUsers,
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
    
    message : null,
    isDeleted : false ,
    isUpdated : false ,
}
  export const deleteUpdateUserReducer = (
    state = DELETE_UPDATE_USER_INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
    //   case UPDATE_BRAND_REQUEST:
        return { ...state, loading: true };
  
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: true,
          message : action.payload.message
        };
  
    //   case UPDATE_BRAND_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       isUpdated: true,
    //       message : action.payload.message 
        
    //     };
  
      case DELETE_USER_FAIL:
    //   case UPDATE_BRAND_FAIL:
        return { ...state, error: action.payload };
  
      case DELETE_USER_RESET:
        return {
          ...DELETE_UPDATE_USER_INITIAL_STATE
        };
    //   case UPDATE_BRAND_RESET:
    //     return {
    //       ...DELETE_UPDATE_USER_INITIAL_STATE
    //     };
      default:
        return state;
    }
  };

  const userReducer = combineReducers({
    getAllUser : getAllUserReducer,
    deleteUpdateUser : deleteUpdateUserReducer
  })

  export default userReducer