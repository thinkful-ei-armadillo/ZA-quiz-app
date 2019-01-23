/* global $ */
'use strict';


const QUESTIONS = [
  {
    question: 'What year did Steven Gerrard join Liverpool FC?',
    options: ['1990', '1998', '2002', '2004'],
    correctAns: '1998'
  },
  {
    question: 'What country Mo Salah is from?',
    options: ['Germany', 'UK', 'USA', 'Egypt'],
    correctAns: 'Egypt'
  },
  {
    question: 'How many CL wins does Liverpool have?',
    options: ['2', '3', '4', '5'],
    correctAns: '5'
  },
  {
    question: 'Who was the top goal scorer in 2017 and 2018?',
    options: ['Ronaldo', 'Salah', 'Firmino', 'Dzeko'],
    correctAns: 'Salah'
  },
  {
    question: 'What country is Roberto Firmino from?',
    options: ['Brazil', 'UK', 'Mexico', 'Australia'],
    correctAns: 'Brazil'
  }
];

const STORE = {
  currentView: 'start',
  currentQuestion: '',
  userAnswer: '',
  currentScore: 0,
  questionNumber: 0,
  correctAnswer: '',
  askedQuestions: [],
  indexTracker: 0
};

// generate HTML elements ====page template====
function generateStartHtmlString(){
  return `<section class="start-page">
            <p>How much of a Liverpool FC supporter are you?</p>
            <button type="button" class="js-start-button" >Start Quiz</button>
          </section>`;
}

function generateHtmlQuestionsString(state, question){
  // const currentQuestion = question[state.].question;
  const options = question[state.askedQuestions[state.indexTracker]].options;
  
  return `<div class="question-page">
    <div class="quiz-info-section">
        <p>Question <span class="current-question-number">${state.questionNumber}</span> of <span class="total-question-number">${QUESTIONS.length}</span></p>
        <p>Score: <span class="correct-score-count">${state.currentScore}</span>/<span class="total-question-number">${QUESTIONS.length}</span></p>
    </div>
    <div class="current-question-section">
        <form>
            <p class="current-question">${state.currentQuestion}</p>
            <div id="options">
                <label>
                  <input type="radio" id="Option-one" name="option" value="${options[0]}" required> ${options[0]}
                </label>
                <br>
                <label>
                  <input type="radio" id="Option-two" name="option" value="${options[1]}" required> ${options[1]}
                </label>
                <br>
                <label>
                  <input type="radio" id="Option-three" name="option" value="${options[2]}" required> ${options[2]}
                </label>
                <br>
                <label>
                  <input type="radio" id="Option-four" name="option" value="${options[3]}" required> ${options[3]}
                </label>
                <br>
                  <input type="submit" value="Submit Answer" class="js-submit-answer-button">
            </div>
        </form>
    </div>
  </div>`;
}

function generateHtmlFeedbackString(state){
  const isCorrect = state.correctAnswer === state.userAnswer;
  return `<div class="feedback-page">
                <div>
                    <p class="feedback-message">Your answer was <span class="question-result">${isCorrect ? 'correct!' : 'incorrect!'}</span></p>
                    ${isCorrect ? 'Good job!' : `<p class="correct-answer">The correct answer is ${state.correctAnswer}.</p>`}
                </div>
                <input type="button" value="Next" class="js-next-question-button">
            </div>`;
}

function generateHtmlResultString(state){
  return `<div class="final-result">
            <p class="result-score-message">Your score was <span class="result-score">${STORE.currentScore}</span></p>
            <p class="message-based-on-result">Thanks for playing!</p>
            <input type="button" value="Reset" class="js-reset-quiz-button">
        </div>`;
}

// Render HTML string to DOM
function renderHtml(){
  if (STORE.currentView === 'start'){
    console.log('Start working');
    $('.js-main').html(generateStartHtmlString());
  }
  else if (STORE.currentView === 'quiz'){
    console.log('Quiz working');
    $('.js-main').html(generateHtmlQuestionsString(STORE, QUESTIONS));
  }
  else if (STORE.currentView === 'feedback'){
    console.log('Feedback working');
    $('.js-main').html(generateHtmlFeedbackString(STORE));
  } else if(STORE.currentView === 'result') {
    $('.js-main').html(generateHtmlResultString(STORE));
  }
}


function randomQuestionState(){
  STORE.questionNumber++;
  STORE.currentQuestion = QUESTIONS[STORE.askedQuestions[STORE.indexTracker]].question;
  STORE.correctAnswer = QUESTIONS[STORE.askedQuestions[STORE.indexTracker]].correctAns;
}

// Handle start-quiz submit
function handleStartQuiz(){
  $('.js-main').on('click', '.js-start-button', function(){
    STORE.currentView = 'quiz';
    randomQuestionState();
    //STORE.questionNumber++;
    renderHtml();
    STORE.indexTracker++;
  });
}

function updateUserScore(){
  if(STORE.correctAnswer === STORE.userAnswer){
    STORE.currentScore++;
  }
}

// Handle submit answer 
function handleAnswerSubmit(){   
  $('.js-main').on('submit', 'form', function(event){
    event.preventDefault();
    const userAnswer = $(this)
      .find('input[name="option"]:checked')
      .val();

    STORE.userAnswer = userAnswer;
    STORE.currentView = 'feedback';
    updateUserScore();
    renderHtml();
  });
}

function generateRandomQuestions(){
  const max = QUESTIONS.length;
  const random = [];
  for (let i = 0; i < max; i++){
    let num = Math.floor(Math.random() * max);
    if (random.indexOf(num) === -1){
      random.push(num);
      STORE.askedQuestions.push(num);
    }
    else
      i--;
  }
}

// Handle next question 
function handleNextQuestion(){
  $('.js-main').on('click', '.js-next-question-button', function(){
    if (STORE.indexTracker < QUESTIONS.length){
      randomQuestionState();
      STORE.currentView = 'quiz';
      renderHtml();
      STORE.indexTracker++;
    } else {
      STORE.currentView = 'result';
      renderHtml();
    }
  });
}

// handle reset quiz-app
function handleReset(){
  $('.js-main').on('click', '.js-reset-quiz-button', function(){
    STORE.currentView = 'start';
    STORE.currentQuestion = '';
    STORE.userAnswer = '';
    STORE.currentScore = 0;
    STORE.questionNumber = 0;
    STORE.correctAnswer = '';
    STORE.askedQuestions = [];
    STORE.indexTracker = 0;
    generateRandomQuestions();
    renderHtml();
  });
}

function main(){
  renderHtml();
  generateRandomQuestions();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  handleReset();
}

$(main);