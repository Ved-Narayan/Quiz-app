import React from 'react';
import { Check, X } from 'lucide-react';
import { Question } from '../types';

interface QuizReportProps {
  questions: Question[];
  answers: { [key: number]: string };
  email: string;
}

const QuizReport: React.FC<QuizReportProps> = ({ questions, answers, email }) => {
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (answers[index] === question.correct_answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
        <p className="text-gray-600 mb-2">Email: {email}</p>
        <p className="text-xl font-semibold">
          Score: {calculateScore()} out of {questions.length}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Question {index + 1}: {question.question}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium">Your Answer:</p>
                <div
                  className={`p-3 rounded-md ${
                    answers[index] === question.correct_answer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {answers[index] === question.correct_answer ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    {answers[index] || 'Not answered'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Correct Answer:</p>
                <div className="bg-green-100 text-green-800 p-3 rounded-md">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {question.correct_answer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizReport;