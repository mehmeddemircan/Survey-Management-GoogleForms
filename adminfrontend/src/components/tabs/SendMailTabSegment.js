import { Card, Form, message } from 'antd'
import React, { useEffect, useState } from 'react'
import SendMailCard from '../card/SendMailCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_SURVEY_TO_EMAIL_RESET } from '../../redux/constants/SurveyConstants'

const SendMailTabSegment = () => {

  const {id} = useParams()
  const [surveyId, setSurveyId] = useState(`${id}`)
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  const sendSurveyToEmail = useSelector((state) => state.survey.sendSurveyToEmail)
  const [form] = Form.useForm()
  useEffect(() => {
    if (sendSurveyToEmail.success) {
      message.success(sendSurveyToEmail.message)
      form.resetFields()
      dispatch({type : SEND_SURVEY_TO_EMAIL_RESET})
    }
  }, [sendSurveyToEmail.success])

  return (
    <div className='d-flex justify-content-center'>

       <SendMailCard form={form} surveyId={surveyId} email={email} setEmail={setEmail} />
    </div>
  )
}

export default SendMailTabSegment