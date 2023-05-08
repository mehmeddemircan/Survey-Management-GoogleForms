import React, { Fragment } from "react";


const CircularProgress = ({ question }) => {
  const totalOptions = question.options.length;
  let totalResponses = 0;
  let optionPercentages = {};

  const responsesCount = question.responses.length;
  const optionsCount = question.options.length;

  if (optionsCount === 0) {
    // If the question has no options, assume it's a short answer question
    totalResponses += 1;
  } else {
    //   Calculate the percentage of responses for each option
    question.options.forEach((option, index) => {
      const optionResponses = question.responses.filter(
        (response) => response === option
      ).length;
      const optionPercentage = (optionResponses / responsesCount) * 100;
      totalResponses += optionPercentage;
      optionPercentages[option] = optionPercentages[option] || 0;
      optionPercentages[option] += optionPercentage;
    });
  }


  

  const colors = ["#f5222d", "#fa8c16", "#1890ff", "#52c41a", "#722ed1"];

  const optionsWithColor = Object.entries(optionPercentages)
    .sort(([, a], [, b]) => b - a) // Sort options by percentage in descending order
    .map(([option, percentage], index) => ({
      option,
      percentage,
      color: colors[index % colors.length], // Cycle through the available colors
    }));

  return (
    <Fragment>
      <div style={{ marginLeft: 32 }}>
        {optionsWithColor.map(({ option, percentage, color }) => (
          <div
            key={option}
            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: color,
                marginRight: 8,
              }}
            />
            <button
              className="btn"
              style={{ minWidth: "25vw", border: `1px solid ${color}` }}
            >
              {option}{" "}
              <div
                className="d-inline-block"
                style={{ marginLeft: "auto", fontWeight: "bold" }}
              >
                {Math.round(percentage)} %
              </div>
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default CircularProgress;
