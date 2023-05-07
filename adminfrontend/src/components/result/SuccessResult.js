import { Result } from 'antd'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { SUBMIT_SURVEY_RESET } from '../../redux/constants/SurveyConstants'

const SuccessResult = ({handleGiveAnotherResponse}) => {

 
  return (
   <Fragment>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

<Result
status="success"
title={<><a>Başarili Şekilde Cevaplar Kaydedildi</a><div><button className='btn btn-primary rounded-pill mt-3' onClick={handleGiveAnotherResponse} >Başka Yanıt ver</button> </div></>}
/>

</div>

   </Fragment>
  )
}

export default SuccessResult