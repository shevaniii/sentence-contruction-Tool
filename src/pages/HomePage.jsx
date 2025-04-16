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
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Sentence Construction</h1>
        <p className="text-sm text-gray-500 mb-6">
          Select the correct words to complete the sentence by arranging the provided options in the right order.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Time Per Question</p>
            <p className="text-base font-semibold text-gray-800">30 sec</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Questions</p>
            <p className="text-base font-semibold text-gray-800">10</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coins</p>
            <p className="text-base font-semibold text-yellow-500">● 0</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button
            onClick={startQuiz}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;