import { useLocation, useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-3xl font-bold text-blue-700">Quiz Completed!</h2>
        <p className="text-xl text-gray-800 font-medium">
          You scored <span className="text-green-600 font-bold">{score}</span> out of{" "}
          <span className="text-blue-600 font-bold">{total}</span>
        </p>
        <button
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
