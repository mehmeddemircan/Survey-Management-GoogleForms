import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundResult = () => {
    const navigate = useNavigate()
  return (
    <div className='d-flex justify-content-center align-items-center'style={{height : '100vh'}}>
         <Result
    status="404"
    title="404"
    subTitle="Böyle Bir Anket bulunamadi maalesef :("
    extra={<Button type="primary" onClick={() => navigate('/',{replace: true})} >Anasayfaya dön</Button>}
  />
    </div>
  )
}

export default NotFoundResult