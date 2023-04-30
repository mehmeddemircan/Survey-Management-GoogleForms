import React, { useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import SurveyDetailsLayout from '../components/layout/SurveyDetailsLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetSingleSurvey } from '../redux/actions/SurveyActions'
import SurveyCard from '../components/card/SurveyCard'

const SurveyDetailsPage = () => {

    const dispatch = useDispatch()

    const {id} = useParams()

    useEffect(() => {
        dispatch(GetSingleSurvey(id))
    }, [dispatch])

  return (
    <SurveyDetailsLayout>
                
    </SurveyDetailsLayout>
  )
}

export default SurveyDetailsPage