import { Tooltip } from 'antd'
import React from 'react'

const InfoTooltip = ({text,children}) => {
  return (
    <Tooltip placement="bottom" title={text}>
        {children}
  </Tooltip>
  )
}

export default InfoTooltip