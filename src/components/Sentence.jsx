const Sentence = ({ sentenceParts, selectedWords, handleBlankClick }) => {
    return (
      <div className="text-xl font-medium text-center my-6">
        {sentenceParts.map((part, index) => (
          <span key={index}>
            {part}
            {index < selectedWords.length && (
              <button
                onClick={() => handleBlankClick(index)}
                className="mx-1 underline text-blue-600"
              >
                {selectedWords[index] || '____'}
              </button>
            )}
          </span>
        ))}
      </div>
    );
  };
  
  export default Sentence;
  