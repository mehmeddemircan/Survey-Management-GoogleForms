import { Result } from 'antd'
import React from 'react'

const SuccessResult = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

    <Result
    status="success"
    title="Başarılı Şekilde Cevaplar Kaydedildi "

   
  />
  </div>
  )
}

export default SuccessResult