import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();

  const startQuiz = async () => {
    try {
      const res = await axios.get("https://sentence-json-api.onrender.com/questionData");
      if (res.data.status === "SUCCESS") {
        const questions = res.data.data.questions;
        navigate("/sentence", { state: { questions } });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">Welcome to the Sentence Completion Quiz</h1>
        <p className="text-gray-700 text-md">
          Fill in the blanks using the options provided. You have 30 seconds per question. Your score will be shown at the end.
        </p>
        <button
          onClick={startQuiz}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-semibold transition-all duration-200"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
