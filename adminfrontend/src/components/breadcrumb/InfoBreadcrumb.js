import { Breadcrumb } from 'antd'
import React from 'react'

// hangi sayfada  olduğunu gösteren breadcrumb
const InfoBreadcrumb = ({separator = '/' , items =[]}) => {
  return (
    <Breadcrumb separator={separator} >
    {items.map((item, index) => (
      <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
    ))}
  </Breadcrumb>
  )
}

export default InfoBreadcrumb