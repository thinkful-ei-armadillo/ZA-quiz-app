'use strict';

const STORE = {
  currentState: 'start',
  currentQuestion: '',
  userAnswer: null,
  currentScore: 0,
  questionNumber: null

};


// generate HTML elements ====page template====

function generateStartHtmlString(){
  return `<section class="start-page">
    <p>How much of a Liverpool FC supporter are you?</p>
    <p></p>
    <button class="start-button">Start Quiz</button>
</section>`;
}

function generateHtmlQuestionsString(){
  return `<div class="question-page">
    <div class="quiz-info-section">
        <p>Question <span class="current-question-number">1</span> of <span class="total-question-number">10</span></p>
        <p><span class="correct-score-count">0</span>/<span class="total-question-number">10</span></p>
    </div>
    <div class="current-question-section">
        <form>
            <p class="current-question">What year did Steven Gerrard joined Liverpool FC?</p>
            <ul id="options">
                <li><input type="radio" id="Option-one" name="option"><label for="Option-one"> 1999</label></li>
                <li><input type="radio" id="Option-two" name="option"><label for="Option-two"> 2002</label></li>
                <li><input type="radio" id="Option-three" name="option"><label for="Option-three"> 1998</label></li>
                <li><input type="radio" id="Option-four" name="option"><label for="Option-four"> 2005</label></li>
            </ul>
            <input type="button" value="Submit Answer" class="submit-answer-button">
        </form>
    </div>
</div>`;
}

function generateHtmlFeedbackString(){
  return `<div class="feedback-page">
                <div>
                    <p class="feedback-message">Your answer was <span class="question-result"></span></p>
                    <p class="correct-answer">The correct answer is <span class="correct-answer-result"></span></p>
                </div>
                <input type="button" value="Next Question" class="next-question-button">
            </div>`;
}

function generateHtmlResultString(){
  return `<div class="final-result">
            <p class="result-score-message">Your score was <span class="result-score"></span></p>
            <p class="message-based-on-result"></p>
            <input type="button" value="Reset" class="reset-quiz-button">
        </div>`;
}

// Render HTML string to DOM
function renderHtml(){
  const startPage = generateStartHtmlString(STORE, QUESTIONS);
}

// Handle start-quiz submit
function handleStartQuiz(){

}

// Handle submit answer 
function handleAnswerSubmit(){

}

// Handle next question 
function handleNextQuestion(){

}

// handle reset quiz-app
function handleReset(){

}

function main(){

}

$(main);