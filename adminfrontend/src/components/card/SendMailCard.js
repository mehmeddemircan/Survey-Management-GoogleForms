import { Card, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { SendSurveyToEmail } from "../../redux/actions/SurveyActions";

const SendMailCard = ({form,surveyId,email,setEmail}) => {

  const dispatch = useDispatch()
  const handleSendSurveyToEmail = () => {
    dispatch(SendSurveyToEmail({surveyId,email}))
  
  }

  return (
    <Card
      title="Anketi Gönder"
      bordered={true}
      style={{
        width: "50%",
      }}
    >
      <Form
        form={form}
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
        initialValues={{ email: "" }}
      >
        <Form.Item
          name="usermail"
          label="Kullanici Maili"
          className="mt-3"
     
          rules={[
            {
              required: true,
              message: "Mail Giriniz lütfen !",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Kullanici maili yaziniz  "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <button className="mt-3 btn btn-dark rounded-pill" onClick={handleSendSurveyToEmail}>
            Mail Gönder
          </button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SendMailCard;
