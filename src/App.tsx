import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizState } from './types';
import EmailForm from './components/EmailForm';
import Timer from './components/Timer';
import QuestionNavigation from './components/QuestionNavigation';
import QuizReport from './components/QuizReport';


function App() {
  // Initializes the quiz state and manages all app-level data.
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestion: 0,
    answers: {},
    visitedQuestions: new Set([0]),
    email: '',
    timeRemaining: 30 * 60, // 30 minutes in seconds
    isQuizSubmitted: false,
  });

  // Decodes HTML entities to readable text for the questions and answers.
  const decodeHtmlEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  // Fetches questions from the API and formats them for the quiz.
  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      const data = await response.json();
      const formattedQuestions = data.results.map((question: Question) => ({
        ...question,
        allAnswers: [
          question.correct_answer,
          ...question.incorrect_answers,
        ].map(decodeHtmlEntities), // Decode special characters
      }));
      setState(prev => ({ ...prev, questions: formattedQuestions }));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Triggers the fetchQuestions function when the email is submitted.
  useEffect(() => {
    if (state.email) {
      fetchQuestions();
    }
  }, [state.email]);

  // Manages the countdown timer and stops it when time runs out.
  useEffect(() => {
    if (state.email && !state.isQuizSubmitted) {
      const timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.email, state.isQuizSubmitted]);

  // Handles the submission of the email to start the quiz.
  const handleEmailSubmit = (email: string) => {
    setState(prev => ({ ...prev, email }));
  };

  // Records the selected answer for the current question.
  const handleAnswerSelect = (answer: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [prev.currentQuestion]: answer },
    }));
  };

  // Updates the current question index and marks it as visited.
  const handleQuestionSelect = (index: number) => {
    setState(prev => ({
      ...prev,
      currentQuestion: index,
      visitedQuestions: new Set([...prev.visitedQuestions, index]),
    }));
  };

  // Marks the quiz as submitted and stops further interactions.
  const handleQuizSubmit = useCallback(() => {
    setState(prev => ({ ...prev, isQuizSubmitted: true }));
  }, []);

  if (!state.email) {
    // Displays the email form if no email is submitted yet.
    return <EmailForm onSubmit={handleEmailSubmit} />;
  }

  if (state.isQuizSubmitted || state.timeRemaining === 0) {
    // Displays the quiz report if the quiz is submitted or time is up.
    return (
      <QuizReport
        questions={state.questions}
        answers={state.answers}
        email={state.email}
      />
    );
  }

  if (state.questions.length === 0) {
    // Displays a loading spinner while fetching questions.
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Gets the current question from the list of fetched questions.
  const currentQuestion: Question = state.questions[state.currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Displays the countdown timer */}
      <Timer timeRemaining={state.timeRemaining} onTimeUp={handleQuizSubmit} />

      {/* Navigation to move between questions */}
      <QuestionNavigation
        totalQuestions={state.questions.length}
        currentQuestion={state.currentQuestion}
        visitedQuestions={state.visitedQuestions}
        answers={state.answers}
        onQuestionSelect={handleQuestionSelect}
      />

      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            {/* Displays the current question */}
            <h2 className="text-xl font-semibold mb-2">
              Question {state.currentQuestion + 1} of {state.questions.length}
            </h2>
            <p className="text-gray-600">{decodeHtmlEntities(currentQuestion.question)}</p>
          </div>

          {/* Displays the list of answer options */}
          <div className="space-y-3">
            {currentQuestion.allAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  state.answers[state.currentQuestion] === answer
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>

          {/* Navigation for Previous and Next/Submit buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => handleQuestionSelect(Math.max(0, state.currentQuestion - 1))}
              disabled={state.currentQuestion === 0}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {state.currentQuestion === state.questions.length - 1 ? (
              <button
                onClick={handleQuizSubmit}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => handleQuestionSelect(state.currentQuestion + 1)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>  
    </div>
  );
}

export default App;
