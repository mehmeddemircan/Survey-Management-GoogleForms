import React, { Fragment } from 'react'
import MainHeader from '../header/MainHeader'
import SurveyHeaderTabs from '../tabs/SurveyHeaderTabs'
import MainFooter from '../footer/MainFooter'

const SurveyDetailsLayout = ({children}) => {
  return (
        <Fragment>
            <MainHeader />
            <SurveyHeaderTabs />
            <div className='container'>
                {children}
            </div>
            <MainFooter />
        </Fragment>
  )
}

export default SurveyDetailsLayout