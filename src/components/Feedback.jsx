import React from "react";
import { useLocation } from "react-router-dom";

const FeedbackPage = () => {
  const location = useLocation();
  const score = location.state?.score ?? 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quiz Finished!</h2>
      <p>Your score is: <strong>{score}</strong></p>
    </div>
  );
};

export default FeedbackPage;
