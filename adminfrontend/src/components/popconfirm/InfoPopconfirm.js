import { Popconfirm } from 'antd'
import React from 'react'

const InfoPopconfirm = ({title , description,children, confirm,handleCancelPopconfirm}) => {
  return (
<Popconfirm
    title={title}
    description={description}
    onConfirm={confirm}
    onCancel={handleCancelPopconfirm}
    okText="Evet"
    cancelText="Hayır"
  >
  {children}
  </Popconfirm>
  )
}

export default InfoPopconfirm