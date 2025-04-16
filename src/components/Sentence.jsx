import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sentence = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  const questions = location.state?.questions || [];

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentIndex];
      setSelectedWords(new Array(currentQuestion.correctAnswer.length).fill(""));
      setTimer(30);
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    if (timer === 0) {
      handleAutoNext();
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleAutoNext = () => {
    const correct = questions[currentIndex].correctAnswer;
    const isCorrect = correct.every((word, i) => word === selectedWords[i]);

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/feedback", {
        state: { score: isCorrect ? score + 1 : score, total: questions.length },
      });
    }
  };

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
    handleAutoNext();
  };

  if (questions.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Loading questions...</p>;
  }

  const currentQ = questions[currentIndex];
  const parts = currentQ.question.split(/__+/g);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 space-y-6">
        {/* Top Section: Question & Timer */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="font-medium">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <span className="font-semibold text-red-500">Time Left: {timer}s</span>
        </div>

        {/* Sentence */}
        <div className="text-lg font-medium text-gray-800 leading-8 text-center">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < currentQ.correctAnswer.length && (
                <button
                  onClick={() => handleBlankClick(i)}
                  className={`inline-block align-middle mx-1 min-w-[80px] px-3 py-1 rounded-lg border text-base font-semibold transition 
                    ${
                      selectedWords[i]
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                >
                  {selectedWords[i] || "____"}
                </button>
              )}
            </span>
          ))}
        </div>

        {/* Word Options */}
        <div className="flex flex-wrap justify-center gap-3">
          {currentQ.options.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordClick(word)}
              disabled={selectedWords.includes(word)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40 transition"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sentence;
