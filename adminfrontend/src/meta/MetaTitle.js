import React from 'react'
import { Helmet } from 'react-helmet';
const MetaTitle = ({title,name,content}) => {
  // uygulama tab başlıklarını değiştirme işlemi 
  return (
    <Helmet>
    <title>{title}</title>
    <meta name={name} content={content} />
  </Helmet>
  )
}

export default MetaTitle