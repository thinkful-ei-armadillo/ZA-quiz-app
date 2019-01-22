
'use strict';


const QUESTIONS = [
    {
        question: 'What year did Steven Gerrard joined Liverpool FC?',
        options: [1990, 1998, 2002, 2004],
        correctAns: 1998

    }
];

const STORE = {
  currentState: 'start',
  currentQuestion: '',
  userAnswer: '',
  currentScore: 0,
  questionNumber: 0,
  correctAnswer: ''

};


// generate HTML elements ====page template====

function generateStartHtmlString(){
  return `<section class="start-page">
    <p>How much of a Liverpool FC supporter are you?</p>
    <p></p>
    <button class="js-start-button">Start Quiz</button>
</section>`;
}

function generateHtmlQuestionsString(state, question){
  const currentQuestion = question[state.questionNumber - 1].question;
  const options = question[state.questionNumber - 1].options;
    return `<div class="question-page">
    <div class="quiz-info-section">
        <p>Question <span class="current-question-number">${state.questionNumber}</span> of <span class="total-question-number">${QUESTIONS.length}</span></p>
        <p><span class="correct-score-count">${state.currentScore}</span>/<span class="total-question-number">${QUESTIONS.length}</span></p>
    </div>
    <div class="current-question-section">
        <form>
            <p class="current-question">${currentQuestion}</p>
            <ul id="options">
                <li><input type="radio" id="Option-one" name="option" value="${options[0]}"/>${options[0]}</li>
                <li><input type="radio" id="Option-two" name="option" value="${options[1]}"/>${options[1]}</li>
                <li><input type="radio" id="Option-three" name="option" value="${options[2]}"/>${options[2]}</li>
                <li><input type="radio" id="Option-four" name="option" value="${options[3]}"/>${options[3]}</li>
            </ul>
            <input type="button" value="Submit Answer" class="js-submit-answer-button">
        </form>
    </div>
</div>`;
}

function generateHtmlFeedbackString(state){
    return `<div class="feedback-page">
                <div>
                    <p class="feedback-message">Your answer was <span class="question-result">${state.correctAnswer === state.userAnswer ? 'correct!' : 'incorrect! <p class="correct-answer">The correct answer is <span class="correct-answer-result"></span></p>'}</span></p>
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
    if (STORE.currentState === 'start'){
        console.log('Start working');
        $('.js-main').html(generateStartHtmlString());
    }
    else if (STORE.currentState === 'quiz'){
        console.log('Quiz working');

        $('.js-main').html(generateHtmlQuestionsString(STORE, QUESTIONS));
    }
    else if (STORE.currentState === 'feedback'){
        console.log('Feedback working');
        $('.js-main').html(generateHtmlFeedbackString(STORE));
    }
}

// Handle start-quiz submit
function handleStartQuiz(){
    $('.js-main').on('click', '.js-start-button', function(event){
        STORE.currentState = 'quiz';
        STORE.currentQuestion = QUESTIONS[STORE.questionNumber].question;
        // STORE.currentScore =
        STORE.correctAnswer = QUESTIONS[STORE.questionNumber].correctAns;
        STORE.questionNumber++;
        renderHtml();
    });
}

// Handle submit answer 
function handleAnswerSubmit(){    
    $('.js-main').on('click', '.js-submit-answer-button', function(event){
        const userAnswer = $(event.currentTarget).closest('form').find('input[name="option"]:checked').val();
        console.log(userAnswer);
        STORE.userAnswer = userAnswer;
        STORE.currentState = 'feedback';
        renderHtml();
    });
}

// Handle next question 
function handleNextQuestion(){

}

// handle reset quiz-app
function handleReset(){

}

function main(){
    renderHtml();
    handleStartQuiz();
    handleAnswerSubmit();
}

$(main);