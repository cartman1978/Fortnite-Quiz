// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('.info_container');
const quit_btn = info_container.querySelector('.buttons .quit');
const continue_btn = info_container.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const end_box = document.querySelector('.end_box');
const endMessage = document.querySelector('.endMessage');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices'));
const finalScore = document.querySelector('#finalScore');

let currentQuestion = {};
let gettingAnswer = false;
let score = 0;
let availableQuestions = [];
const bonusCorrectAnswer = 10;
const maxQuestions = 3;

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
    end_box.classList.remove("quizActive");
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

  
    //    Remove current question from available questions to avoid question repeatition 
    availableQuestions.splice(questionIndex, 1);
    gettingAnswer = true;
};

//    Validate user selected answer 
choices.forEach(choice => {
   choice.addEventListener('click', event => {
      if(!gettingAnswer) return;

    gettingAnswer = false;
    const choiceSelected = event.target;
    const answerSelected = choiceSelected.dataset['number'];
    getNextQuestion();
   });
});

startGame()

// Function to call when there are no question left
// Diplay message depending on the score get by the user

endGame = () => {
    const totalScore = maxQuestions * bonusCorrectAnswer;
    quiz_box.classList.add('hideActive');
    end_box.classList.remove('hideActive');
    end_box.innerText = score + " / " + totalScore;
    if (score === (maxQuestions * bonusCorrectAnswer)) {
        endMessage.innerText = "Wow this is what I call perfection!";
    } else if(score >= ((maxQuestions / 5 * 4 ) * bonusCorrectAnswer)) {
       endMessage.innerText = "Great! Almost a perfect score!";
    } else if(score > ((maxQuestions / 2) * bonusCorrectAnswer)) {
        endMessage.innerText = "Well, you're above the average!";
    } else if(score >= ((maxQuestions / 5) * bonusCorrectAnswer)) {
        endMessage.innerText = "No bad, but you can do better!";
    } else {
        endMessage.innerText = "Ohh... you need a refresh!";
    }
};