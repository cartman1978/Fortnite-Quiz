// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('.info_container');
const quit_btn = info_container.querySelector('.buttons .quit');
const continue_btn = info_container.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices'));

let currentQuestion = {};
let gettingAnswer = true;
let score = 0;
let availableQuestions = [];

// If start button is clicked show info box
start_btn.onclick = () => {
    info_container.classList.add("activeInfo"); 

    
}

// If quit button is clicked

quit_btn.onclick = () => {
    info_container.classList.remove("activeInfo");
}

// If continue btutton is clicked Show Quiz questions box

continue_btn.onclick = () => {
    info_container.classList.remove("activeInfo");
    quiz_box.classList.add("quizActive");
}

let questions = [
  {
    "question": "Inside which HTML element do we put the JavaScript??",
    "choice1": "<script>",
    "choice2": "<javascript>",
    "choice3": "<js>",
    "choice4": "<scripting>",
    "answer": 1
  },
  {
    "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "choice1": "<script href='xxx.js'>",
    "choice2": "<script name='xxx.js'>",
    "choice3": "<script src='xxx.js'>",
    "choice4": "<script file='xxx.js'>",
    "answer": 3
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  }
];

const BONUS_ANSWER = 10;
const MAX_QUESTIONS = 3;

// Function to start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNextQuestion();
}


// Function to get new questions 
getNextQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
       const number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number];
    });
}

startGame()