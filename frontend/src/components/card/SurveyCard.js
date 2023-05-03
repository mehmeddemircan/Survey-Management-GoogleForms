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
        <div className="d-flex justify-content-between">
          <div>{survey.description}</div>
          <div>
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