import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { GetSurveyFavorites } from "../redux/actions/UserActions";
import SurveyCard from "../components/card/SurveyCard";
import { message } from "antd";
import {
  ADD_SURVEY_TO_FAVORITE_RESET,
  REMOVE_SURVEY_FROM_FAVORITE_RESET,
} from "../redux/constants/UserConstants";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import EmptyComponent from "../components/empty/EmptyComponent";
import MetaTitle from "../meta/MetaTitle";

const FavoritesPage = () => {
  const getUserFavorites = useSelector((state) => state.user.getUserFavorites);
  const addRemoveFavorite = useSelector(
    (state) => state.user.addRemoveFavorite
  );
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSurveyFavorites(auth.user._id));
    if (addRemoveFavorite.isAdded) {
      message.success(addRemoveFavorite.message);
      dispatch({ type: ADD_SURVEY_TO_FAVORITE_RESET });
    }
    if (addRemoveFavorite.isRemoved) {
      message.success(addRemoveFavorite.message);
      dispatch({ type: REMOVE_SURVEY_FROM_FAVORITE_RESET });
    }
  }, [dispatch, auth, addRemoveFavorite.isAdded, addRemoveFavorite.isRemoved]);
  return (
    <MainLayout>
            <MetaTitle title="Akınsoft Favori Anketlerim" name="favorilerim" content="Akınsoft favorilerim" />
      {getUserFavorites.loading ? (
        <LoadingSpinner />
      ) : getUserFavorites.data.favorites.length === 0 ? (
        <EmptyComponent />
      ) : (
        getUserFavorites.data.favorites.map((survey) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))
      )}
    </MainLayout>
  );
};

export default FavoritesPage;
