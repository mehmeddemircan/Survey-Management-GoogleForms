import React, { useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import SurveyDetailsLayout from '../components/layout/SurveyDetailsLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetSingleSurvey } from '../redux/actions/SurveyActions'
import SurveyCard from '../components/card/SurveyCard'
import { message } from 'antd'
import { UPDATE_SURVEY_RESET } from '../redux/constants/SurveyConstants'

const SurveyDetailsPage = () => {

    const dispatch = useDispatch()
    const deleteUpdateSurvey = useSelector((state) => state.survey.deleteUpdateSurvey)
    const {id} = useParams()

    useEffect(() => {
        dispatch(GetSingleSurvey(id))
        if (deleteUpdateSurvey.isUpdated) {
          message.success(deleteUpdateSurvey.message)
          dispatch({type : UPDATE_SURVEY_RESET})
        }
    }, [dispatch,deleteUpdateSurvey.isUpdated])

  return (
    <SurveyDetailsLayout>
                
    </SurveyDetailsLayout>
  )
}

export default SurveyDetailsPage