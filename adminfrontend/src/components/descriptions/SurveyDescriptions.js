import { Descriptions, Tag } from "antd";
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const SurveyDescriptions = ({isPreviewCard, survey }) => {
  const getSingleSurvey = useSelector((state) => state.survey.getSingleSurvey);
  const getAllSurvey = useSelector((state) => state.survey.getAllSurvey);
  return (
    <Descriptions className="d-flex flex-column" title={isPreviewCard ? "" : "Anket Bilgileri"}>
      <Descriptions.Item
        className="me-4"
        style={{ display: "inline-block" }}
        label="Açıklama"
      >
        {survey.description}
      </Descriptions.Item>
        {!isPreviewCard && ( 
             <>
              <Descriptions.Item
              style={{ display: "inline-block" }}
              label="Oluşturulma Tarihi"
            >
              {moment(survey.createdAt).format("MMM Do YY")}
            </Descriptions.Item>
            <Descriptions.Item
              className="me-4"
              style={{ display: "inline-block" }}
              label="Son Güncellenme Tarihi"
            >
              {moment(survey.createdAt).format("MMM Do YY")}
            </Descriptions.Item>
            {getSingleSurvey.success && (
              <Descriptions.Item
                style={{ display: "inline-block" }}
                label="Oluşturan Kişi"
              >
                <Tag color="#108ee9">
                  {" "}
                  {survey.createdBy.firstname} {survey.createdBy.lastname}
                </Tag>
              </Descriptions.Item>
            )}
             </>
      
        ) 
        }
      <Descriptions.Item></Descriptions.Item>
    </Descriptions>
  );
};

export default SurveyDescriptions;
