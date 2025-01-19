export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestion: number;
  answers: { [key: number]: string };
  visitedQuestions: Set<number>;
  email: string;
  timeRemaining: number;
  isQuizSubmitted: boolean;
}

export interface ApiResponse {
  response_code: number;
  results: Question[];
}