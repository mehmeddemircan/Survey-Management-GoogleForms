import React, { Fragment, useEffect, useState } from "react";
import { Card, Input, Radio, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
const QuestionPreviewCard = ({ question, responses, setResponses }) => {

  // her sorunun id sine göre input değerlerini tutar
  const onChange = (e) => {
    setResponses({
      ...responses,
      [question._id]: e.target.value,
    });
  };
  const submitSurvey = useSelector((state) => state.survey.submitSurvey)
  // başarılı şekilde anket cevaplandiysa inputları sıfırlar
  useEffect(() => {
    if (!submitSurvey.success) {
      setResponses({
        [question._id]: "",
      })
    }
  }, [submitSurvey.success])

  return (
    <Fragment>
      <Card
        className="my-2"
        hoverable
        title={
          <>
            <h6 className="d-inline-block">{question.questionText}</h6>
            {question.isRequired ? (
              <i
                class="fa-sharp fa-solid fa-star-of-life mx-2 "
                style={{ fontSize: "10px", color: "red" }}
              ></i>
            ) : null}
          </>
        }
        bordered={true}
      >
        {question.questionType === "Kısa Yanıt" && (
          <Input
            className="w-25"
            placeholder="Kısa Yanıt"
            bordered={false}
            style={{ borderBottom: "1px solid rgb(221,221,221)" }}
            value={responses[question._id] || ""}
            onChange={onChange}
          />
        )}

        {question.questionType === "Uzun Yanıt" && (
          <TextArea
            className="w-25"
            rows={5}
            maxLength={200}
            placeholder="Uzun Yanıt"
            bordered={false}
            style={{ borderBottom: "1px solid rgb(221,221,221)" }}
            value={responses[question._id] || ""}
            onChange={onChange}
          />
        )}

        {question.questionType === "Çoktan Seçmeli" && (
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={onChange}
              value={responses[question._id] || undefined}
            >
              <Space direction="vertical">
                {question.options.map((option) => (
                  <Radio value={option} key={option}>
                    {option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default QuestionPreviewCard;
