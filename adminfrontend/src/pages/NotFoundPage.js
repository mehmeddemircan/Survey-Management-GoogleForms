import React from 'react'
import { Button, Result } from 'antd';
import MainLayout from '../components/layout/MainLayout';
import MetaTitle from '../meta/MetaTitle';
const NotFoundPage = () => {
  return (
        <MainLayout>
                <MetaTitle title="Akınsoft Sayfa Bulunamadı" name="sayfabulunamadı" content="Sayfa bulunamadı" />
            <Result
    status="404"
    title="404"
    subTitle="Üzgünüz Aradığın sayfa bulunamadı... "
    extra={<Button type="primary" href='/'>Anasayfaya Dön</Button>}
  />
        </MainLayout>
  )
}

export default NotFoundPage