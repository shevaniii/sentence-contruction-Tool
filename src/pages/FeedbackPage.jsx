import { useLocation, useNavigate } from "react-router-dom";
import Feedback from "../components/Feedback";
import { Button } from "@/components/ui/button"; // Adjust path if needed

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
    <div className="max-w-3xl mx-auto py-6 px-4 text-center">
      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full border-4 border-green-500 flex flex-col items-center justify-center text-xl font-semibold text-green-600">
          <span>{correctCount}</span>
          <span className="text-base text-gray-500">/ {totalQuestions}</span>
        </div>
      </div>

      <Feedback results={results} />

      <Button className="mt-6" onClick={handleRestart}>
        Restart Quiz
      </Button>
    </div>
  );
};

export default FeedbackPage;
