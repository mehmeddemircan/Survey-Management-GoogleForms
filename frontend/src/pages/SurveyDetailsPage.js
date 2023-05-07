import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AllQuestionOfSurvey,
  GetSingleSurvey,
  SubmitSurveyForm,
} from "../redux/actions/SurveyActions";
import SurveyCard from "../components/card/SurveyCard";
import QuestionCard from "../components/card/QuestionCard";
import SuccessResult from "../components/result/SuccessResult";
import NotFoundResult from "../components/result/NotFoundResult";
import BackTopButton from "../components/backtop/BackTopButton";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import MetaTitle from "../meta/MetaTitle";
const SurveyDetailsPage = () => {
  const getSingleSurvey = useSelector((state) => state.survey.getSingleSurvey);
  const getAllQuestion = useSelector((state) => state.survey.getAllQuestion);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSingleSurvey(id));
    dispatch(AllQuestionOfSurvey(id));
  }, [dispatch]);

  const [responses, setResponses] = useState({});

  const handleSubmitForm = (id, responses) => {
    const data = {
      surveyId: id,
      ...responses,
    };
    dispatch(SubmitSurveyForm(data));
  };

  const submitSurvey = useSelector((state) => state.survey.submitSurvey);

  return (
    <Fragment>
      <MetaTitle
        title={`${getSingleSurvey.survey.title} Anket `}
        name="surveydetails"
        content="surveydetails"
      />
      <div className="container">
      <div className="text-center">
      <img 
          width={'25%'}
          src="https://www.akinsoft.com.tr/logo/images/akinsoft_yatay_logo/akinsoft_yatay_logo.png"
        />
      </div>
        {submitSurvey.success ? (
          <SuccessResult />
        ) : getSingleSurvey.loading ? (
          <LoadingSpinner />
        ) : getSingleSurvey.success ? (
          <>
            <SurveyCard />
            {getAllQuestion.loading ? (
              <LoadingSpinner />
            ) : (
              getAllQuestion.data.questions.map((question) => (
                <QuestionCard
                  key={question._id}
                  question={question}
                  responses={responses}
                  setResponses={setResponses}
                />
              ))
            )}
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-md my-2 btn-dark rounded-pill"
                onClick={() => handleSubmitForm(id, responses)}
              >
                Gönder
              </button>
            </div>
          </>
        ) : (
          <NotFoundResult />
        )}
      </div>
      <BackTopButton />
    </Fragment>
  );
};

export default SurveyDetailsPage;
