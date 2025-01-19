# Quiz-app

**Overview**

This quiz application is a dynamic platform for testing knowledge with multiple-choice questions. Users enter their email to start, complete the quiz within the time limit, and view their performance summary at the end.

**Approach**

Fetching Questions: Questions are retrieved from the Open Trivia Database (OTDB) API.
Dynamic Timer: Includes a countdown timer for managing the 30-minute quiz session.
Responsive Navigation: Users can navigate between questions, and visited questions are tracked.
Interactive UI: Glassmorphism styling with a gradient animated background enhances the user experience.
Components Built
Email Form: Handles email submission.
Timer: Displays and manages countdown for the quiz session.
Question Navigation: Allows users to navigate between questions efficiently.
Quiz Report: Summarizes results, including correct and incorrect answers.

**Setup and Installation Instructions**

Clone the repository:
git clone <repository-url>

Navigate to the project directory:
cd quiz-app

Install dependencies:
npm install

Start the application:
npm start
Open http://localhost:3000 to view the application in your browser.

**Assumptions**
Users will provide a valid email address to begin the quiz.
The OTDB API will return 15 multiple-choice questions in each fetch request.
The time limit for the quiz is strictly 30 minutes.

**Challenges and Solutions**
Challenge: Decoding HTML Entities
Problem: Questions from the API contained special characters (", &).
Solution: Implemented a function (decodeHtmlEntities) to parse and render them correctly.

Challenge: Handling Edge Cases
Problem: Users might skip questions or submit without answering all.
Solution: Marked all visited questions and highlighted skipped ones in the navigation.







