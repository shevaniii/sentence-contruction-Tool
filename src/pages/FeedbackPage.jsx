import { useNavigate, useLocation } from "react-router-dom";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total, responses } = location.state || { score: 0, total: 0, responses: [] };
  
  // Calculate percentage score
  const scorePercentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white text-center">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-800">Sentence Construction</h1>
        </div>
        
        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600">{scorePercentage}</span>
          </div>
          <p className="text-sm font-medium text-gray-600">Overall Score</p>
        </div>
        
        {/* Feedback Text */}
        <p className="text-sm text-gray-600 mb-6 max-w-xl mx-auto">
          While you correctly formed several sentences, there are a couple of areas where 
          improvement is needed. Pay close attention to sentence structure and word placement 
          to ensure clarity and correctness. Review your responses below for more details.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="border border-gray-300 px-5 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition mb-8"
        >
          Go to Dashboard
        </button>
        
        {/* Scroll Indicator */}
        <div className="text-gray-400 text-sm mb-2">
          ↓
        </div>
        
        {/* Response List */}
        <div className="space-y-6 max-w-xl mx-auto text-left">
          {responses && responses.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-gray-400">Prompt</p>
                <p className="text-xs text-gray-400">{index + 1}/{responses.length}</p>
              </div>
              
              <p className="text-gray-800 text-sm mb-4">{item.prompt}</p>
              
              <div className="flex items-start mb-1">
                <p className="text-xs text-gray-500">Your response: </p>
                <p className={`text-xs ml-1 ${item.isCorrect ? "text-green-600" : "text-red-500"}`}>
                  {item.isCorrect ? "Correct" : "Incorrect"}
                </p>
              </div>
              
              <p className="text-sm text-gray-800">{item.userResponse}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}