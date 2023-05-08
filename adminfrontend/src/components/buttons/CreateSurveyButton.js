import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSurveyModal from "../modal/survey/AddSurveyModal";


const CreateSurveyButton = () => {
  const [showAddSurveyModal, setShowAddSurveyModal] = useState(false);

  // anket oluştur modal aç 
  const handleShowAddSurveyModal = () => {
    setShowAddSurveyModal(true);
  };

  // anket modalı kapat
  const handleCloseAddSurveyModal = () => {
    setShowAddSurveyModal(false);
  };

  return (
    <Fragment>
      <button
        className="btn btn-primary rounded-pill mx-2"
        onClick={handleShowAddSurveyModal}
      >
        Anket Oluştur
      </button>
      <AddSurveyModal
        showAddSurveyModal={showAddSurveyModal}
        handleCloseAddSurveyModal={handleCloseAddSurveyModal}
      />
    </Fragment>
  );
};

export default CreateSurveyButton;
