import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

import SurveyList from "../components/list/SurveyList";
import InfoBreadcrumb from "../components/breadcrumb/InfoBreadcrumb";
import InfoBadge from "../components/badge/InfoBadge";
import CustomPagination from "../components/pagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { AllSurvey } from "../redux/actions/SurveyActions";
import CreateSurveyButton from "../components/buttons/CreateSurveyButton";
import FiltersButton from "../components/buttons/FiltersButton";
import { message } from "antd";
import {
  CREATE_SURVEY_RESET,
  DELETE_SURVEY_RESET,
  UPDATE_SURVEY_RESET,
} from "../redux/constants/SurveyConstants";
import { useNavigate } from "react-router-dom";
import SurveySearchBox from "../components/searchbox/SurveySearchBox";
import { GetSurveyFavorites } from "../redux/actions/UserActions";
import { ADD_SURVEY_TO_FAVORITE_RESET, REMOVE_SURVEY_FROM_FAVORITE_RESET } from "../redux/constants/UserConstants";

const HomePage = () => {
  // anketler burada listelenecek

  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const createSurvey = useSelector((state) => state.survey.createSurvey);
  const deleteUpdateSurvey = useSelector(
    (state) => state.survey.deleteUpdateSurvey
  );

  const getAllSurvey = useSelector((state) => state.survey.getAllSurvey);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AllSurvey(limit, currentPage));
    if (createSurvey.success) {
      message.success(createSurvey.message);
      dispatch({ type: CREATE_SURVEY_RESET });
    }
    if (deleteUpdateSurvey.isDeleted) {
      message.success(deleteUpdateSurvey.message);
      dispatch({ type: DELETE_SURVEY_RESET });
    }
    if (deleteUpdateSurvey.isUpdated) {
      message.success(deleteUpdateSurvey.message);
      dispatch({ type: UPDATE_SURVEY_RESET });
    }
  }, [
    dispatch,
    limit,
    currentPage,
    createSurvey.success,
    deleteUpdateSurvey.isDeleted,
    deleteUpdateSurvey.isUpdated
  ]);

  // search survey
  const [title, setTitle] = useState("");

  const auth = useSelector((state) => state.auth);

  const addRemoveFavorite = useSelector((state) => state.user.addRemoveFavorite)

  useEffect(() => {
    dispatch(GetSurveyFavorites(auth.user._id));
    if (addRemoveFavorite.isAdded) {
      message.success(addRemoveFavorite.message)
      dispatch({type : ADD_SURVEY_TO_FAVORITE_RESET})
    }
    if (addRemoveFavorite.isRemoved) {
      message.success(addRemoveFavorite.message)
      dispatch({type : REMOVE_SURVEY_FROM_FAVORITE_RESET})
    }
  }, [dispatch, auth,addRemoveFavorite.isAdded,addRemoveFavorite.isRemoved]);

  return (
    <MainLayout>
      <h5 className="my-4">Anketler</h5>
      <div className="d-flex justify-content-between align-items-center">
        <InfoBreadcrumb
          seperator=">"
          items={[
            {
              title: "Anketler",
            },
            {
              title: (
                <InfoBadge count={getAllSurvey.totalSurveys}>
                  <a className="me-2">Adet</a>
                </InfoBadge>
              ),
            },
          ]}
        />
        <SurveySearchBox title={title} setTitle={setTitle} />
        <div className="d-inline-flex ">
          <CreateSurveyButton />
          <FiltersButton />
        </div>
      </div>

      <SurveyList title={title} />
      <CustomPagination
        onChange={(page) => setCurrentPage(page)}
        current={currentPage}
        defaultCurrent={1}
        pageSize={limit}
        total={getAllSurvey.totalSurveys}
      />
    </MainLayout>
  );
};

export default HomePage;
