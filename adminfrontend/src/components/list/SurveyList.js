import React, { Fragment } from "react";
import SurveyCard from "../card/SurveyCard";
import { List } from "antd";
import { useSelector } from "react-redux";

const SurveyList = ({ title }) => {
  const getAllSurvey = useSelector((state) => state.survey.getAllSurvey);
  const searchSurveys = useSelector((state) => state.survey.searchSurveys);

  return (
    <Fragment>
      <List className="my-4" itemLayout="horizontal">
        {title ? (
          <>
            {searchSurveys.surveys.map((survey) => (
              <SurveyCard key={survey._id} survey={survey} />
            ))}
          </>
        ) : (
          getAllSurvey.surveys.map((survey) => (
            <SurveyCard key={survey._id} survey={survey} />
          ))
        )}
      </List>
    </Fragment>
  );
};

export default SurveyList;
