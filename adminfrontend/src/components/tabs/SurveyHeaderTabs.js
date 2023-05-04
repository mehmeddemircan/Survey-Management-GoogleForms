import { Tabs } from "antd";
import SurveyCard from "../card/SurveyCard";
import { useSelector } from "react-redux";
import QuestionTabSegment from "./QuestionTabSegment";
import InfoBadge from "../badge/InfoBadge";
import ResponseTabSegment from "./ResponseTabSegment";
import SendMailTabSegment from "./SendMailTabSegment";
const { TabPane } = Tabs;
const SurveyHeaderTabs = () => {
  const getAllQuestion = useSelector((state) => state.question.getAllQuestion);
  const getSingleSurvey = useSelector((state) => state.survey.getSingleSurvey)
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane
        key="1"
        tab={
          <InfoBadge count={getAllQuestion.data.questions.length}>
            <a
              className="me-2"
              style={{ textDecorationLine: "none", color: "#222" }}
            >
              Sorular
            </a>
          </InfoBadge>
        }
      >
        <QuestionTabSegment />
      </TabPane>
      <TabPane key="2" tab="Yanıtlar">
            <ResponseTabSegment />
      </TabPane>
      <TabPane key="3" tab="Ayarlar">
        <h2>Ayarlar</h2>
      </TabPane>
      <TabPane key="4" tab={<button className="btn btn-light rounded-pill" onClick={() => window.open(`/anketler/${getSingleSurvey.survey._id}/onizleme`, '_blank')}>Anket Önizle</button>}>
     
     </TabPane>
      <TabPane key="5" tab={<button className="btn btn-dark rounded-pill">Mail Gönder</button>}>
          <SendMailTabSegment />
      </TabPane>
    </Tabs>
  );
};

export default SurveyHeaderTabs;
