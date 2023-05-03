import React from 'react'
import InfoResult from './InfoResult'
import {Button} from 'antd'
const SuccessResult = () => {
  return (
  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

    <InfoResult
    status="success"
    title="Başarılı Şekilde Cevaplar Kaydedildi "

   
  />
  </div>
  )
}

export default SuccessResult