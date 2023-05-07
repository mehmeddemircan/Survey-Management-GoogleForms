import {Form, Button, Modal, Select } from "antd";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CreateQuestion } from "../../../redux/actions/QuestionActions";
import { useParams } from "react-router-dom";

import AddEditQuestionForm from "../../form/AddEditQuestionForm";
import ShowQuestionDrawer from "../../drawer/ShowQuestionDrawer";

const AddQuestionModal = ({
  showAddQuestionModal,
  handleCloseAddQuestionModal,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [surveyId, setSurveyId] = useState(`${id}`);
  const [questionText, setQuestionText] = useState("");
  const [questionTypes, setQuestionTypes] = useState([
    "Kısa Yanıt",
    "Uzun Yanıt",
    "Çoktan Seçmeli",
  ]);
  const [questionType, setQuestionType] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  // const [options, setOptions] = useState([]);
  const [optionsObjects, setOptionObjects] = useState([
    {
      id: 0,
      option: "",
    },
  ]);

  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();
  const resetForm = () => {
    setSurveyId(`${id}`);
    setQuestionText("");
    setQuestionType("");
    setIsRequired(false);
    setOptionObjects([{ id: 0, option: "" }]);
    setOptions([]);
  };

  const createQuestion = useSelector((state) => state.question.createQuestion);

  useEffect(() => {
    if (createQuestion.success) {
      form.resetFields(); // reset the form fields
      resetForm()
      handleCloseAddQuestionModal();
    }
  }, [createQuestion.success,form, handleCloseAddQuestionModal, resetForm]);

  const handleSelectQuestionType = (value) => {
    setQuestionType(value);
  };

  const onRequiredChange = () => {
    setIsRequired((prev) => !prev);
  };

  const handleAddQuestion = () => {
    dispatch(
      CreateQuestion({
        surveyId,
        questionText,
        questionType,
        options,
        isRequired,
      })
    );
  };

  const handleAddOption = () => {
    setOptionObjects([
      ...optionsObjects,
      {
        id: optionsObjects.length,
        option: "",
      },
    ]);
  };
  useEffect(() => {
    const optionStrings = optionsObjects.map((option) => option.option);
    const filteredOptionStrings = optionStrings.filter(
      (option) => option.trim() !== ""
    );
    setOptions(filteredOptionStrings);
    const lastOptionIndex = optionsObjects.length - 1;
    if (optionsObjects[lastOptionIndex].option.trim() !== "" && lastOptionIndex === options.length - 1) {
      const lastOption = optionsObjects[lastOptionIndex].option.trim();
      setOptions([...options, lastOption]);
    }
  }, [optionsObjects]);

  const [showQuestionDrawer, setShowQuestionDrawer] = useState(false);

  const handleShowQuestionDrawer = () => {
    setShowQuestionDrawer(true);
  };

  const handleCloseShowQuestionDrawer = () => {
    setShowQuestionDrawer(false);
  };

  const [question, setQuestion] = useState({
    questionText: "",
    questionType: "",
    options: [],
    isRequired: false,
  });

  useEffect(() => {
    setQuestion({
      questionText: questionText,
      questionType: questionType,
      options: options,
      isRequired: isRequired,
    });
  }, [questionText, questionType, options, isRequired]);
  return (
    <Modal
      centered={true}
      title="Soru Ekle"
      open={showAddQuestionModal}
      onOk={handleAddQuestion}
      onCancel={handleCloseAddQuestionModal}
      footer={[
        <Button key="questionShow" onClick={handleShowQuestionDrawer}>
          Ön İzleme Yap
        </Button>,

        <Button key="submit" type="primary" onClick={handleAddQuestion}>
          Onayla
        </Button>,
      ]}
    >
    
      <ShowQuestionDrawer
        question={question}
        showQuestionDrawer={showQuestionDrawer}
        handleCloseShowQuestionDrawer={handleCloseShowQuestionDrawer}
      />
    
    
      <AddEditQuestionForm
        form={form}
        questionText={questionText}
        setQuestionText={setQuestionText}
        handleSelectQuestionType={handleSelectQuestionType}
        questionType={questionType}
        questionTypes={questionTypes}
        setQuestionType={setQuestionType}
        optionsObjects={optionsObjects}
        setOptionObjects={setOptionObjects}
        handleAddOption={handleAddOption}
        onRequiredChange={onRequiredChange}
        isRequired={isRequired}
      />
    </Modal>
  );
};

export default AddQuestionModal;
