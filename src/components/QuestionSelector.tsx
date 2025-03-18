
import React from "react";
import { Button } from "@/components/ui/button";

interface QuestionSelectorProps {
  selectedQuestion: number;
  onQuestionChange: (questionNumber: number) => void;
}

const QuestionSelector = ({ selectedQuestion, onQuestionChange }: QuestionSelectorProps) => {
  const questions = [1, 2, 3, 4];
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Question Selection</h2>
      <div className="flex space-x-4">
        {questions.map(questionNumber => (
          <Button
            key={questionNumber}
            variant={selectedQuestion === questionNumber ? "default" : "outline"}
            className={
              selectedQuestion === questionNumber 
                ? "bg-[#f59f00] hover:bg-[#e08e00] text-black border-none" 
                : "bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a]"
            }
            onClick={() => onQuestionChange(questionNumber)}
          >
            Question {questionNumber}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
