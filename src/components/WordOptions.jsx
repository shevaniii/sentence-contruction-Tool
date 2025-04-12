import { Button } from "@/components/ui/button.jsx";

const WordOptions = ({ words, handleWordClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {words.map((word, index) => (
        <Button key={index} onClick={() => handleWordClick(word)}>
          {word}
        </Button>
      ))}
    </div>
  );
};

export default WordOptions;
