import React, { Fragment } from 'react'
import MainHeader from '../header/MainHeader'
import SurveyHeaderTabs from '../tabs/SurveyHeaderTabs'
import MainFooter from '../footer/MainFooter'
import BackTopButton from '../backtop/BackTopButton'

const SurveyDetailsLayout = ({children}) => {
  return (
        <Fragment>
            <MainHeader />
            <SurveyHeaderTabs />
            <div className='container'>
                {children}
            </div>
            <BackTopButton />
            <MainFooter />
        </Fragment>
  )
}

export default SurveyDetailsLayout