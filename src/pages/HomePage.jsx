import { useEffect, useState } from 'react';
import axios from 'axios';
import Sentence from './Sentence';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:3000/questions');
        if (res.data.status === 'SUCCESS') {
          setQuestions(res.data.data.questions);
          setSelectedWords(new Array(res.data.data.questions[0].correctAnswer.length).fill(''));
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleBlankClick = (index) => {
    const newWords = [...selectedWords];
    newWords[index] = ''; // Clear clicked blank
    setSelectedWords(newWords);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentIndex];
  const sentenceParts = currentQuestion.question.split('_____________');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Fill in the Blanks</h1>
      <Sentence
        sentenceParts={sentenceParts}
        selectedWords={selectedWords}
        handleBlankClick={handleBlankClick}
      />
      {/* You’ll probably want to add options and navigation too */}
    </div>
  );
};

export default HomePage;
