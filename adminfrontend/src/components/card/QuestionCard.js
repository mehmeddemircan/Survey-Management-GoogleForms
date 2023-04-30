import { Card, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { Fragment, useState } from "react";
import InfoTooltip from "../tooltip/InfoTooltip";
import { useDispatch } from "react-redux";
import { DeleteQuestion } from "../../redux/actions/QuestionActions";
import { useParams } from "react-router-dom";
import EditQuestionModal from "../modal/question/EditQuestionModal";

const QuestionCard = ({ question }) => {

    const dispatch = useDispatch()
    const {id} = useParams()

    const handleDeleteQuestion = (questionId) => {
        dispatch(DeleteQuestion(id,questionId))
    } 

    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false)

    const handleShowEditQuestionModal = () => {
      setShowEditQuestionModal(true)
    }

    const handleCloseEditQuestionModal = () => {
      setShowEditQuestionModal(false)
    }

  return (
    <Fragment>
      <Card
        className="my-2"
        hoverable
        title={<><h6 className="d-inline-block">{question.questionText}</h6>{question.isRequired ? <i class="fa-sharp fa-solid fa-star-of-life mx-2 "style={{fontSize:'10px',color : 'red'}}></i> : null}</>}
        bordered={true}
        extra={
          <>
            <button className="btn btn-light mx-2" onClick={handleShowEditQuestionModal}>Düzenle</button>

            <EditQuestionModal 
              question={question}
              showEditQuestionModal={showEditQuestionModal}
              handleCloseEditQuestionModal={handleCloseEditQuestionModal}
            />

            <InfoTooltip text="Soruyu Sil">
              <button className="btn btn-light" onClick={() => handleDeleteQuestion(question._id)}>
                <i class="fa-solid fa-trash"></i>
              </button>
            </InfoTooltip>
          </>
        }
      >
        {question.questionType === "Kısa Yanıt" && (
          <Input
            disabled={true}
            className="w-25"
            placeholder="Kısa Yanıt"
            bordered={false}
            style={{ borderBottom: "1px solid rgb(221,221,221)" }}
          />
        )}

        {question.questionType === "Uzun Yanıt" && (
          <TextArea
            disabled={true}
            className="w-25"
            rows={5}
            maxLength={200}
            placeholder="Uzun Yanıt"
            bordered={false}
            style={{ borderBottom: "1px solid rgb(221,221,221)" }}
          />
        )}

        {question.questionType === "Çoktan Seçmeli" && (
          <div className="d-flex flex-column">
            {question.options.map((option) => (
              <div className="d-inline-flex">
                <Radio disabled={true} />
                <Input
                  disabled={true}
                  placeholder="Seçenek Giriniz"
                  bordered={false}
                  defaultValue={option}
                />
              </div>
            ))}
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default QuestionCard;
