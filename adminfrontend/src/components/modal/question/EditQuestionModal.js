import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import AddEditQuestionForm from '../../form/AddEditQuestionForm'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UpdateQuestion } from '../../../redux/actions/QuestionActions';

const EditQuestionModal = ({question,showEditQuestionModal,handleCloseEditQuestionModal}) => {

    const dispatch = useDispatch();


  const [questionText, setQuestionText] = useState(question.questionText);
  const [questionTypes, setQuestionTypes] = useState([
    "Kısa Yanıt",
    "Uzun Yanıt",
    "Çoktan Seçmeli",
  ]);
  const [questionType, setQuestionType] = useState(question.questionType);
  const [isRequired, setIsRequired] = useState(question.isRequired);
  // const [options, setOptions] = useState([]);
  const [optionsObjects, setOptionObjects] = useState(() => {
    // Initialize with the default options if available
    if (question.options && question.options.length > 0) {
      return question.options.map((option, i) => ({
        id: i,
        option: option,
      }));
    }
    
    // Otherwise, initialize with an empty array
    return [];
  });

  const [options, setOptions] = useState(question.options);

  const handleSelectQuestionType = (value) => {
    setQuestionType(value);
  };

  const onRequiredChange = () => {
    setIsRequired((prev) => !prev);
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



  const handleUpdateQuestion = () => {
    dispatch(
      UpdateQuestion(question._id,{
        questionText,
        questionType,
        options,
        isRequired,
      })
    );
    handleCloseEditQuestionModal();
  };


  return (
    <Modal
      centered={true}
      title="Soru Düzenle"
      open={showEditQuestionModal}
      onOk={handleUpdateQuestion}
      onCancel={handleCloseEditQuestionModal}
    >   
      
       <AddEditQuestionForm 
            isEditForm={true}
            isRequired={isRequired}
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
            options={options}
            setOptions={setOptions}
        />
    </Modal>
  )
}

export default EditQuestionModal