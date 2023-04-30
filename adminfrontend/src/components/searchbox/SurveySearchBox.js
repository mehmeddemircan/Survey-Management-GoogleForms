import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { SearchSurvey } from '../../redux/actions/SurveyActions'

const SurveySearchBox = ({title,setTitle}) => {


    const dispatch = useDispatch()
  const handleSearchSurveys = (e) => {
    setTitle(e.target.value)
    dispatch(SearchSurvey(title))
    // if (e.Key == "Enter") {
    //   dispatch(SearchUser(name))
    // }
  }



  return (
    <Fragment>
       
        <input 
          className='form-control w-50 rounded-pill'
          placeholder='Anket ara'
          value={title}
          onChange={handleSearchSurveys}
         
        />
  
    </Fragment>
  )
}

export default SurveySearchBox