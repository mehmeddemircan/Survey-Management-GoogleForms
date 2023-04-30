import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddSurveyModal from '../modal/survey/AddSurveyModal'

const CreateSurveyButton = () => {

    const navigate = useNavigate()

    const [showAddSurveyModal, setShowAddSurveyModal] = useState(false)

    const handleShowAddSurveyModal =() => {
      setShowAddSurveyModal(true)
    }

    const handleCloseAddSurveyModal = () => {
      setShowAddSurveyModal(false)
    }


//  onClick={() => navigate('/create-survey',{replace : true})}
  return (
    <Fragment>
    <button className='btn btn-primary rounded-pill mx-2' onClick={handleShowAddSurveyModal} >Anket Oluştur</button>
    <AddSurveyModal 
      showAddSurveyModal={showAddSurveyModal}
      handleCloseAddSurveyModal={handleCloseAddSurveyModal}
    />
    </Fragment>

  )
}

export default CreateSurveyButton