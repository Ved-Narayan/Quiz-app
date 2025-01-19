import React from 'react';
import { Check, Circle, Eye } from 'lucide-react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  answers: { [key: number]: string };
  onQuestionSelect: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onQuestionSelect,
}) => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Questions Overview</h3>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentQuestion === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {answers[i] ? (
              <Check className="w-4 h-4" />
            ) : visitedQuestions.has(i) ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;