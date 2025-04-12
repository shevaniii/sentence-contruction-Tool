const Feedback = ({ results }) => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Results</h2>
        {results.map((item, index) => (
          <div key={index} className="mb-4 p-4 rounded border">
            <p><strong>Q{index + 1}:</strong> {item.sentence}</p>
            <p>Your Answer: <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>{item.userAnswer.join(" ")}</span></p>
            {!item.isCorrect && (
              <p>Correct Answer: <span className="text-green-700">{item.correctAnswer.join(" ")}</span></p>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default Feedback;
  