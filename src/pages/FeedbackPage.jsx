import { useLocation, useNavigate } from "react-router-dom";
import Feedback from "../components/Feedback";
import { Button } from "@/components/ui/button"; 

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };

  const correctCount = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        {/* Score Section - Left */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
          <div className="w-40 h-40 rounded-full border-[6px] border-green-500 flex flex-col items-center justify-center text-4xl font-extrabold text-green-600 bg-white shadow-inner">
            <span>{correctCount}</span>
            <span className="text-base text-gray-500 font-medium">
              out of {totalQuestions}
            </span>
          </div>
          <Button
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
            onClick={handleRestart}
          >
            Restart Quiz
          </Button>
        </div>
  
        {/* Feedback Section - Right */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-left text-blue-700 mb-4">
            Quiz Summary
          </h2>
          <Feedback results={results} />
        </div>
      </div>
    </div>
  );
  
};

export default FeedbackPage;
