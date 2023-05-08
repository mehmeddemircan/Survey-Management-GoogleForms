import axios from "axios";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  IS_USER_LOGGED_IN_REQUEST,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
} from "../constants/AuthConstants";

// giriş yapma 
export const Login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await axios.post(`https://akinsoftanketapi.onrender.com/api/login`, {
      ...user,
    });

    // Success
    if (res.status >= 200 && res.status <= 205) {
      const { token, user , message } = res.data;
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
          message
        },
      });
    } else {
      dispatch({ type: LOGIN_FAIL });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,

      payload: error.response.data,
    });
  }
};
// kayıt olma 
export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });


    
    const res = await axios.post("https://akinsoftanketapi.onrender.com/api/register", user);

    // Success
    if (res.status >= 200 && res.status <= 205) {
      const { token, user ,message} = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
          message
        },
      });

   
    }
   

  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

// sayfa yenilendiğinde dahi kullanıcı girişlerini sifırlamayı önler
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({
      type : IS_USER_LOGGED_IN_REQUEST ,
    })
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: "das",
      });
    }
  };
};

// Logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");


  dispatch({ type: LOGOUT_SUCCESS });
};

// forgot password
export const ForgotPassword = (user) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("https://akinsoftanketapi.onrender.com/api/forgot-password", user, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

// Reset password
export const ResetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `https://akinsoftanketapi.onrender.com/api/reset-password/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response,
    });
  }
};
