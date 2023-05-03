import React from 'react'
import InfoResult from './InfoResult'
import {Button} from 'antd'
const NotFoundResult = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <InfoResult  status="404" title="Sayfa Bulunamadı 404" subTitle="Sorry, the page you visited does not exist." extra={<Button type="primary">Back Home</Button>} />
    </div>
  )
}

export default NotFoundResult