import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sentence = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [responses, setResponses] = useState([]);

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
    
  //  user response string created
    const currentQ = questions[currentIndex];
    const parts = currentQ.question.split(/__+/g);
    const userResponseText = parts.map((part, i) => {
      return part + (i < selectedWords.length ? (selectedWords[i] || "") : "");
    }).join("");

    // response whic is added to collection
    const newResponses = [...responses];
    newResponses[currentIndex] = {
      prompt: currentQ.question,
      userResponse: userResponseText,
      isCorrect: isCorrect
    };
    setResponses(newResponses);

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/feedback", {
        state: { 
          score: isCorrect ? score + 1 : score, 
          total: questions.length,
          responses: newResponses
        },
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

  const handleQuit = () => {
    navigate("/");
  };

  if (questions.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Loading questions...</p>;
  }

  const currentQ = questions[currentIndex];
  
  //progress percentage  caculated for the progres bar
  const completedPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex justify-center flex-col items-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header with timer and quit button */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-700">
            {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </div>
          <button 
            onClick={handleQuit}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Quit
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-1 bg-yellow-500 rounded-full" 
            style={{ width: `${completedPercentage}%` }}
          ></div>
        </div>

        {/* Instruction */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">Select the missing words in the correct order</p>
        </div>

        {/* Sentence with blanks */}
        <div className="mb-8 text-base leading-8 text-gray-800">
          {currentQ.question.split(/__+/g).map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < currentQ.correctAnswer.length && (
                <button
                  onClick={() => handleBlankClick(i)}
                  className={`mx-1 px-2 py-1 min-w-16 border-b-2 ${
                    selectedWords[i] 
                      ? "border-blue-500 text-blue-700" 
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {selectedWords[i] || "_______"}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Word options */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {currentQ.options.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordClick(word)}
              disabled={selectedWords.includes(word)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  selectedWords.includes(word)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Next button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="text-sm text-blue-600 px-4 py-1 rounded hover:bg-blue-50"
          >
            <span className="mr-2">→</span>
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sentence;