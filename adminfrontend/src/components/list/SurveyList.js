import React, { Fragment } from "react";
import SurveyCard from "../card/SurveyCard";
import { Empty, List } from "antd";
import { useSelector } from "react-redux";
import LoadingSpinner from "../spinner/LoadingSpinner";
import EmptyComponent from "../empty/EmptyComponent";

const SurveyList = ({ title }) => {
  const getAllSurvey = useSelector((state) => state.survey.getAllSurvey);
  const searchSurveys = useSelector((state) => state.survey.searchSurveys);

  return (
    <Fragment>
      <List className="my-4" itemLayout="horizontal">
        {title ? (
          <>
            {searchSurveys.loading ? <LoadingSpinner /> : searchSurveys.surveys.length === 0 ? <EmptyComponent />  :  searchSurveys.surveys.map((survey) => (
              <SurveyCard key={survey._id} survey={survey} />
            ))}
          </>
        ) : (
         <>
          {getAllSurvey.loading ? <LoadingSpinner /> : getAllSurvey.surveys.length === 0 ? <EmptyComponent /> : getAllSurvey.surveys.map((survey) => (
            <SurveyCard key={survey._id} survey={survey} />
          ))}
         </>
        )}
      </List>
    </Fragment>
  );
};

export default SurveyList;
