import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../spinner/LoadingSpinner";
import SurveyCard from "../card/SurveyCard";
import EmptyComponent from "../empty/EmptyComponent";
import QuestionCard from "../card/QuestionCard";
import { AllQuestionOfSurvey } from "../../redux/actions/QuestionActions";
import { useParams } from "react-router-dom";

const ResponseTabSegment = () => {
  const getSingleSurvey = useSelector((state) => state.survey.getSingleSurvey);
  const getAllQuestion = useSelector((state) => state.question.getAllQuestion);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(AllQuestionOfSurvey(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      {getSingleSurvey.loading ? (
        <LoadingSpinner />
      ) : (
        <SurveyCard isDetailsCard={true} survey={getSingleSurvey.survey} />
      )}

      <h6>Sorular</h6>
      <hr />
      {getAllQuestion.loading ? (
        <LoadingSpinner />
      ) : getAllQuestion.data.questions.length === 0 ? (
        <EmptyComponent />
      ) : (
        getAllQuestion.data.questions.map((question) => (
          <QuestionCard
            responses={question.responses}
            isResponseCard={true}
            key={question._id}
            question={question}
          />
        ))
      )}
    </div>
  );
};

export default ResponseTabSegment;
