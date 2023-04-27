import { Badge, Space } from 'antd'
import React from 'react'

const InfoBadge = ({children,count}) => {
  return (
    <Space size="middle">
    <Badge count={count} >
        {children}
    </Badge>
    </Space>
  )
}

export default InfoBadge