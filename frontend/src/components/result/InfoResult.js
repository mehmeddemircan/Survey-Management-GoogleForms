import React from 'react'
import { Button, Result } from 'antd';
const InfoResult = ({status,title,subTitle,extra}) => {
  return (
    <Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={extra}
  />
  )
}

export default InfoResult