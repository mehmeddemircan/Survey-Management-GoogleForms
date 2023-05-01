import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PrivateRoute from "./routes/PrivateRoute";
import { isUserLoggedIn } from "./redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import UsersPage from "./pages/UsersPage";
import SurveyDetailsPage from "./pages/SurveyDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import { ADD_SURVEY_TO_FAVORITE_RESET, REMOVE_SURVEY_FROM_FAVORITE_RESET } from "./redux/constants/UserConstants";
import { message } from "antd";
import ProfilePage from "./pages/ProfilePage";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // When we fresh the page if you are in logged in  stay logged in


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
   
  }, [auth.authenticate]);

  return (
    <Router>
      <Routes>
        <Route
          index
          path="/"
          element={
            <PrivateRoute authenticate={auth.loading === false ? true : false}>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/kullanicilar"
          element={
            <PrivateRoute authenticate={auth.loading === false ? true : false}>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route path="/anketler/:id" element={<SurveyDetailsPage />} />
        <Route path="/favorilerim" element={<FavoritesPage />} />
        <Route path="/profilim" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
