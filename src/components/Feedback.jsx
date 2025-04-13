const Feedback = ({ results }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-left text-blue-700">Results</h2>
      {results.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl shadow-sm border-l-4 ${
            item.isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
          }`}
        >
          <p className="text-lg font-medium text-gray-800 mb-2">
            <span className="text-blue-600 font-semibold">Q{index + 1}:</span>{" "}
            {item.sentence}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Your Answer:</span>{" "}
            <span
              className={`font-semibold ${
                item.isCorrect ? "text-green-700" : "text-red-600"
              }`}
            >
              {item.userAnswer.join(" ")}
            </span>
          </p>
          {!item.isCorrect && (
            <p className="text-sm mt-1">
              <span className="font-semibold text-gray-700">Correct Answer:</span>{" "}
              <span className="text-green-700 font-semibold">
                {item.correctAnswer.join(" ")}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feedback;
