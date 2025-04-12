const Header = ({ questionNo, totalQuestions, timeLeft }) => {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h2 className="text-xl font-semibold">Question {questionNo}/{totalQuestions}</h2>
        <p className="text-red-500 font-bold text-lg">{timeLeft}s</p>
      </div>
    );
  };
  
  export default Header;
  