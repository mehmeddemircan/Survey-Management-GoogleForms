import React , {Fragment} from 'react'
import {useSelector} from 'react-redux'
import {Card, Image} from 'antd'
const SurveyCard = () => {

    const {survey} = useSelector((state) => state.survey.getSingleSurvey)

  return (
   <Fragment>
 <Card
        className="my-4"
        type="inner"
        title={survey.title}
      >
        <div className="row">
          <div className='col-md-6 col-sm-12'>{survey.description}</div>
          <div className='col-md-6 col-sm-12 text-end mt-3'>
            {survey.image  ?  <Image
              className="img-fluid"
              width={300}
              height={200}
              src={
                survey.image
              }
            /> : null}
          </div>
        </div>
      </Card>
   </Fragment>
  )
}

export default SurveyCard