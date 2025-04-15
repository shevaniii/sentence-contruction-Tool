import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sentence from "../components/Sentence";
import WordOptions from "../components/WordOptions";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Fetch questions from JSON server
  useEffect(() => {
    fetch("https://sentence-json-api.onrender.com/questionData")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setSelectedWords(Array(data[0].correctAnswer.length).fill(""));
      });
  }, []);

  const currentQ = questions[current];

  // Timer
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleWordClick = (word) => {
    const index = selectedWords.findIndex((w) => w === "");
    if (index !== -1) {
      const updated = [...selectedWords];
      updated[index] = word;
      setSelectedWords(updated);
    }
  };

  const handleBlankClick = (index) => {
    const updated = [...selectedWords];
    updated[index] = "";
    setSelectedWords(updated);
  };

  const handleNext = () => {
    const isCorrect = selectedWords.every(
      (w, i) => w === currentQ.correctAnswer[i]
    );

    const updatedResults = [
      ...results,
      {
        sentence: currentQ.sentenceParts.join(" ____ "),
        userAnswer: selectedWords,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
      },
    ];

    if (current + 1 < questions.length) {
      const nextQ = questions[current + 1];
      setCurrent(current + 1);
      setSelectedWords(Array(nextQ.correctAnswer.length).fill(""));
      setTimeLeft(30);
      setResults(updatedResults);
    } else {
      navigate("/feedback", { state: { results: updatedResults } });
    }
  };

  if (!questions.length)
    return <div className="text-center p-6">Loading...</div>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full px-6 py-8 bg-white shadow-md rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-tight">
          Sentence Construction Tool
        </h2>
  
        <Header
          questionNo={current + 1}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
        />
  
        <div className="my-6">
          <Sentence
            sentenceParts={currentQ.sentenceParts}
            selectedWords={selectedWords}
            handleBlankClick={handleBlankClick}
          />
        </div>
  
        <div className="mb-8">
          <WordOptions
            words={currentQ.options}
            handleWordClick={handleWordClick}
          />
        </div>
  
        <div className="text-center mt-6">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 disabled:bg-gray-400"
            onClick={handleNext}
            disabled={selectedWords.includes("")}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}  
export default HomePage;
