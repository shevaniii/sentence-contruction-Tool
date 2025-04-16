import { useNavigate } from "react-router-dom";

export default function FeedbackPage() {
  const navigate = useNavigate();
  console.log("feedback page run")

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white text-center">
        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600">93</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">Overall Score</p>
        </div>

        {/* Feedback Text */}
        <p className="text-sm text-gray-600 mb-6 max-w-xl mx-auto">
          While you correctly formed several sentences, there are a couple of areas where improvement is needed.
          Pay close attention to sentence structure and word placement to ensure clarity and correctness.
          Review your responses below for more details.
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
        <div className="space-y-4 max-h-[50vh] overflow-y-auto px-2">
          {/* Example correct */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-400 mb-1">Prompt</p>
            <p className="text-gray-800">
              The cat chased the mouse across the yard, leaping over obstacles along the way.
            </p>
            <p className="text-green-600 text-sm mt-2">Your response: Correct</p>
          </div>

          {/* Example incorrect */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-400 mb-1">Prompt</p>
            <p className="text-gray-800">
              She quickly finished her homework before dinner, ensuring she had time to relax.
            </p>
            <p className="text-red-500 text-sm mt-2">Your response: Incorrect</p>
          </div>

        
        </div>
      </div>
    </div>
  );
}
