import { Popover } from 'antd'
import React from 'react'

const GeneralPopover = ({children,content,title,placement,trigger}) => {
  return (
    <Popover content={content} title={title} placement={placement} trigger={trigger}>

        {children}
    </Popover>
  )
}

export default GeneralPopover