import React, {Fragment} from 'react'
import MetaTitle from '../meta/MetaTitle'
import { Button, Result } from 'antd'

const HomePage = () => {
  return (
    <Fragment>
        <MetaTitle title="Kullanici Anasayfa" name="anasayfa" content="anasayfa" />
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
        <img 
          width={'25%'}
          src="https://www.akinsoft.com.tr/logo/images/akinsoft_yatay_logo/akinsoft_yatay_logo.png"
        />
         <Result
    title="Anket bulamadık Şuan kullanıcın anasayfasındasınız lütfen mail yoluyla linkten ankete erişebilirsiniz "
   
  />
        </div>
      
       
      
    </Fragment>
  )
}

export default HomePage