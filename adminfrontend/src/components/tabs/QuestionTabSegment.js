import React, { useEffect, useState } from "react";
import SurveyCard from "../card/SurveyCard";
import { useDispatch, useSelector } from "react-redux";
import AddQuestionModal from "../modal/question/AddQuestionModal";
import { useParams } from "react-router-dom";
import {
  AllQuestionOfSurvey,
  CreateQuestion,
} from "../../redux/actions/QuestionActions";
import { Card, message } from "antd";
import QuestionCard from "../card/QuestionCard";
import {
  CREATE_QUESTION_RESET,
  DELETE_QUESTION_RESET,
  UPDATE_QUESTION_RESET,
} from "../../redux/constants/QuestionConstants";
import AddQuestionForm from "../form/AddQuestionForm";
import LoadingSpinner from "../spinner/LoadingSpinner";
import EmptyComponent from "../empty/EmptyComponent";

const QuestionTabSegment = () => {
  const getSingleSurvey = useSelector((state) => state.survey.getSingleSurvey);

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  const handleShowAddQuestionModal = () => {
    setShowAddQuestionModal(true);
  };
  const handleCloseAddQuestionModal = () => {
    setShowAddQuestionModal(false);
  };

  const { id } = useParams();
  const dispatch = useDispatch();

  const createQuestion = useSelector((state) => state.question.createQuestion);
  const deleteUpdateQuestion = useSelector(
    (state) => state.question.deleteUpdateQuestion
  );

  useEffect(() => {
    dispatch(AllQuestionOfSurvey(id));
    if (createQuestion.success) {
      message.success(createQuestion.message);
      dispatch({ type: CREATE_QUESTION_RESET });
    }
    if (deleteUpdateQuestion.isDeleted) {
      message.success(deleteUpdateQuestion.message);
      dispatch({ type: DELETE_QUESTION_RESET });
    }
    if (deleteUpdateQuestion.isUpdated) {
      message.success(deleteUpdateQuestion.message);
      dispatch({ type: UPDATE_QUESTION_RESET });
    }
  }, [
    dispatch,
    createQuestion.success,
    deleteUpdateQuestion.isDeleted,
    deleteUpdateQuestion.isUpdated,
  ]);
  const getAllQuestion = useSelector((state) => state.question.getAllQuestion);

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary rounded-pill"
          onClick={handleShowAddQuestionModal}
        >
          Soru Ekle
        </button>
        <AddQuestionModal
          showAddQuestionModal={showAddQuestionModal}
          handleCloseAddQuestionModal={handleCloseAddQuestionModal}
        />
      </div>
        {getSingleSurvey.loading ? <LoadingSpinner />  : <SurveyCard isDetailsCard={true} survey={getSingleSurvey.survey} />}

      <h6>Sorular</h6>
      <hr />
      {getAllQuestion.loading ? (
        <LoadingSpinner />
      ) : getAllQuestion.data.questions.length === 0 ? (
        <EmptyComponent />
      ) : (
        getAllQuestion.data.questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))
      )}
    </div>
  );
};

export default QuestionTabSegment;
