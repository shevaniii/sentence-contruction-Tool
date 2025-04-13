const Sentence = ({ sentenceParts, selectedWords, handleBlankClick }) => {
  return (
    <div className="text-xl font-semibold text-center my-8 leading-relaxed flex flex-wrap justify-center gap-2">
      {sentenceParts.map((part, index) => (
        <span key={index} className="flex items-center gap-2">
          <span>{part}</span>
          {index < selectedWords.length && (
            <button
              onClick={() => handleBlankClick(index)}
              className={`min-w-[80px] px-3 py-1 rounded-md border transition-all duration-200 ${
                selectedWords[index]
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
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
