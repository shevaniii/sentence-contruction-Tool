const Header = ({ questionNo, totalQuestions, timeLeft }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white rounded-xl shadow-sm border mb-6">
      {/* Question Progress */}
      <div className="text-lg font-semibold text-gray-800">
        Question{" "}
        <span className="text-blue-600">
          {questionNo}
        </span>
        <span className="text-gray-500"> / {totalQuestions}</span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <p className="text-lg font-bold text-red-600">{timeLeft}s</p>
      </div>
    </div>
  );
};

export default Header;
