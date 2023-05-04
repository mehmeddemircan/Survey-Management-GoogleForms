import React, { Fragment, useEffect, useState } from "react";
import { AllQuestionOfSurvey } from "../redux/actions/QuestionActions";
import {
  GetSingleSurveyPreview,
  SubmitSurveyForm,
} from "../redux/actions/SurveyActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import BackTopButton from "../components/backtop/BackTopButton";
import SurveyCard from "../components/card/SurveyCard";
import QuestionCard from "../components/card/QuestionCard";
import QuestionPreviewCard from "../components/card/QuestionPreviewCard";
import SuccessResult from "../components/result/SuccessResult";
import NotFoundResult from "../components/result/NotFoundResult";
import { Form } from "antd";

const SurveyPreviewPage = () => {
  const getSingleSurveyPreview = useSelector(
    (state) => state.survey.getSingleSurveyPreview
  );
  const getAllQuestion = useSelector((state) => state.question.getAllQuestion);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSingleSurveyPreview(id));
    dispatch(AllQuestionOfSurvey(id));
  }, [dispatch,id]);

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
      <div className="container">
        {submitSurvey.success ? (
          <SuccessResult />
        ) : getSingleSurveyPreview.loading ? (
          <LoadingSpinner />
        ) : getSingleSurveyPreview.success ? (
          <>
            <SurveyCard
              isPreviewCard={true}
              survey={getSingleSurveyPreview.survey}
            />
            {getAllQuestion.loading ? (
              <h2>hello</h2>
            ) : (
              getAllQuestion.data.questions.map((question) => (
                <QuestionPreviewCard
                  key={question._id}
                  question={question}
                  responses={responses}
                  setResponses={setResponses}
                />
              ))
            )}
            <div className="d-flex justify-content-between">
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

export default SurveyPreviewPage;
