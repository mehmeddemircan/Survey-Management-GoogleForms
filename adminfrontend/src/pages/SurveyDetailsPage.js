import React, { useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import SurveyDetailsLayout from '../components/layout/SurveyDetailsLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetSingleSurvey } from '../redux/actions/SurveyActions'
import SurveyCard from '../components/card/SurveyCard'
import { message } from 'antd'
import { UPDATE_SURVEY_RESET } from '../redux/constants/SurveyConstants'
import { GetSurveyFavorites } from '../redux/actions/UserActions'
import { ADD_SURVEY_TO_FAVORITE_RESET, REMOVE_SURVEY_FROM_FAVORITE_RESET } from '../redux/constants/UserConstants'

const SurveyDetailsPage = () => {

    const dispatch = useDispatch()
    const deleteUpdateSurvey = useSelector((state) => state.survey.deleteUpdateSurvey)
    const auth = useSelector((state) => state.auth)
    const addRemoveFavorite = useSelector((state) => state.user.addRemoveFavorite)
    const {id} = useParams()

    useEffect(() => {
        dispatch(GetSingleSurvey(id))
        if (deleteUpdateSurvey.isUpdated) {
          message.success(deleteUpdateSurvey.message)
          dispatch({type : UPDATE_SURVEY_RESET})
        }
    }, [dispatch,deleteUpdateSurvey.isUpdated])

    useEffect(() => {
      dispatch(GetSurveyFavorites(auth.user._id));
      if (addRemoveFavorite.isAdded) {
        message.success(addRemoveFavorite.message)
        dispatch({type : ADD_SURVEY_TO_FAVORITE_RESET})
      }
      if (addRemoveFavorite.isRemoved) {
        message.success(addRemoveFavorite.message)
        dispatch({type : REMOVE_SURVEY_FROM_FAVORITE_RESET})
      }
    }, [dispatch, auth,addRemoveFavorite.isAdded,addRemoveFavorite.isRemoved]);

  return (
    <SurveyDetailsLayout>
                
    </SurveyDetailsLayout>
  )
}

export default SurveyDetailsPage