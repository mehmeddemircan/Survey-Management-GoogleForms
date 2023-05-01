import { Drawer } from "antd";
import React from "react";
import QuestionCard from "../card/QuestionCard";

const ShowQuestionDrawer = ({
  question,
  showQuestionDrawer,
  handleCloseShowQuestionDrawer,
}) => {
  return (
    <Drawer
      title="Ön izleme "
      width={"25%"}
      placement="right"
      onClose={handleCloseShowQuestionDrawer}
      open={showQuestionDrawer}
    >
      <QuestionCard isDrawerCard={true} question={question} />
    </Drawer>
  );
};

export default ShowQuestionDrawer;
