import React , {Fragment} from 'react'
import MainHeader from '../header/MainHeader'
import MainFooter from '../footer/MainFooter'
import BackTopButton from '../backtop/BackTopButton'

const MainLayout = ({children}) => {
  return (
    <Fragment>
        <MainHeader />
        <div className='container'>
        {children}
        </div>
        <BackTopButton />
        <MainFooter />
    </Fragment>
  )
}

export default MainLayout