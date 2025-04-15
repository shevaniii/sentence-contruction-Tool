import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sentence = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState(0);

  const questions = location.state?.questions || [];

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentIndex];
      setSelectedWords(new Array(currentQuestion.correctAnswer.length).fill(""));
    }
  }, [currentIndex, questions]);

  const handleWordClick = (word) => {
    const nextEmptyIndex = selectedWords.findIndex((w) => w === "");
    if (nextEmptyIndex !== -1) {
      const updated = [...selectedWords];
      updated[nextEmptyIndex] = word;
      setSelectedWords(updated);
    }
  };

  const handleBlankClick = (index) => {
    const updated = [...selectedWords];
    updated[index] = "";
    setSelectedWords(updated);
  };

  const handleNext = () => {
    const correct = questions[currentIndex].correctAnswer;
    const isCorrect = correct.every((word, i) => word === selectedWords[i]);

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/feedback", { state: { score, total: questions.length } });
    }
  };

  if (questions.length === 0) {
    return <p className="text-center mt-10">Loading questions...</p>;
  }

  const currentQ = questions[currentIndex];
  const parts = currentQ.question.split(/__+/g);


  return (
    <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full text-center">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Question {currentIndex + 1} / {questions.length}
        </h2>

        {/* Sentence with blanks filled */}
        <div className="text-lg font-medium text-gray-800 mb-6 leading-8">
  {parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < currentQ.correctAnswer.length && (
        <button
          onClick={() => handleBlankClick(i)}
          className={`inline-block align-middle mx-1 min-w-[80px] px-2 py-1 rounded-md border text-sm font-semibold transition ${
            selectedWords[i]
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          {selectedWords[i] || "____"}
        </button>
      )}
    </span>
  ))}
</div>

        {/* Word options */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {currentQ.options.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordClick(word)}
              disabled={selectedWords.includes(word)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Sentence;
