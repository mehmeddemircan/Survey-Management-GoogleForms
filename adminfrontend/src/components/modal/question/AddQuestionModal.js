import { Button, Form, Input, Modal, Radio, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import RequiredSwitch from "../../switch/RequiredSwitch";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateQuestion,
  addOption,
} from "../../../redux/actions/QuestionActions";
import { useParams } from "react-router-dom";
import AddQuestionForm from "../../form/AddEditQuestionForm";
import AddEditQuestionForm from "../../form/AddEditQuestionForm";
const { Option } = Select;
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
    handleCloseAddQuestionModal();
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
  }, [optionsObjects.length]);

  return (
    <Modal
      centered={true}
      title="Soru Ekle"
      open={showAddQuestionModal}
      onOk={handleAddQuestion}
      onCancel={handleCloseAddQuestionModal}
    >
      {options.map((option) => (
        <div>{option}</div>
      ))}
      {options.length}
        <AddEditQuestionForm 
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
        />
    </Modal>
  );
};

export default AddQuestionModal;
