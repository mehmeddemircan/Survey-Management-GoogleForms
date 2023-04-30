import { Tabs } from "antd";
import SurveyCard from "../card/SurveyCard";
import { useSelector } from "react-redux";
import QuestionTabSegment from "./QuestionTabSegment";
import InfoBadge from "../badge/InfoBadge";
const { TabPane } = Tabs;
const SurveyHeaderTabs = () => {
  const getAllQuestion = useSelector((state) => state.question.getAllQuestion);
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
        <h2>hello</h2>
      </TabPane>
      <TabPane key="3" tab="Ayarlar">
        <h2>Ayarlar</h2>
      </TabPane>
    </Tabs>
  );
};

export default SurveyHeaderTabs;
