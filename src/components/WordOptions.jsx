import { Button } from "@/components/ui/button.jsx";

const WordOptions = ({ words, handleWordClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {words.map((word, index) => (
        <Button
          key={index}
          onClick={() => handleWordClick(word)}
          className="bg-white border border-blue-300 text-blue-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-blue-50 hover:scale-105 transition-all duration-200"
        >
          {word}
        </Button>
      ))}
    </div>
  );
};

export default WordOptions;
