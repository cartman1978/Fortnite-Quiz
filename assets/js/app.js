// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('#info-container');
const startButton = document.querySelector('#startButton');
const quitBtn = document.querySelector('#quit');
const continueBtn = document.querySelector('#start');
const quiz_box = document.querySelector('.quiz_box');
const end_box = document.querySelector('#endBox');
const endMessage = document.querySelector('.endMessage');
const exitBtn = document.querySelector('#exit');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices'));
const finalScore = document.querySelector('#finalScore');
const scoreInfo = document.querySelector('#score');
const questionText = document.querySelector('.questionText');
const progressFull = document.querySelector('#progressFull');
const progressText = document.querySelector('#progressText');
const gameSec = document.querySelector('#game-section');

const btnContainer = document.querySelector('.btn-container');
const rules = document.querySelector('#rules');
const playGame = document.querySelector('#playGame');

const playAgain = document.querySelector('#play-again');

let currentQuestion = {};
let questionCounter = 0;
let gettingAnswer = false;
let score = 0;
let availableQuestions = [];
const bonusCorrectAnswer = 10;
const maxQuestions = 10;


// If Quiz rule button is clicked
rules.addEventListener('click', () => {
    btnContainer.classList.add('hidden');
    info_container.style.display = "inline-block";
});

//If Continue OK is clicked, remove info box and diplay buttons again
continueBtn.addEventListener('click', () => {
    info_container.style.display = "none";
    btnContainer.classList.remove('hidden');
});

//  If Play Quiz button is clicjed, show 
playGame.addEventListener('click', () => {
    quiz_box.classList.remove('hidden');
});

// When game is finish end box is displayed
// If exit button is clicked, return to home page

exitBtn.addEventListener('click', () => {
   end_box.classList.add('hidden');
});

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
    scoreInfo.innerText = score;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNextQuestion();

}


// Function to get new questions 
getNextQuestion = () => {
    if (availableQuestions.length === 0) {
        endGame();
    } else {

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        questionCounter++;

        // update question progress bar
        progressText.innerText = `${(questionCounter / maxQuestions) * 100 - 10}%`;
        progressFull.style.width = `${(questionCounter / maxQuestions) * 100 - 10}%`;
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset.number;
            choice.innerText = currentQuestion["choice" + number];
        });


        //    Remove current question from available questions to avoid question repeatition 
        availableQuestions.splice(questionIndex, 1);
        gettingAnswer = true;
        validateUserAnswer();
    }
};



//   Validate user selected answer 
//  if answer is correct, selected answer will highlight green
//  if answer is incorrect, selected answer will highlight red
const validateUserAnswer = () => {
    choices.forEach(choice => {
        choice.addEventListener('click', event => {

            const choiceSelected = event.target;
            const answerSelected = choiceSelected.dataset.number;
            if (!gettingAnswer) return;
            gettingAnswer = false;


            if (answerSelected == currentQuestion.answer) {

                choiceSelected.classList.add('correct');

                scoreUp(bonusCorrectAnswer);
                setTimeout(() => {
                    choiceSelected.classList.remove('correct');
                    getNextQuestion();
                }, 1500);
            } else {
                const correctAnswerNum = currentQuestion.answer;
                const correctAnswer = document.querySelector(`[data-number="${correctAnswerNum}"]`);
                choiceSelected.classList.add('incorrect');
                setTimeout(() => {
                    correctAnswer.classList.add('correct');
                }, 1000);
                setTimeout(() => {
                    choiceSelected.classList.remove('incorrect');
                    correctAnswer.classList.remove('correct');
                    getNextQuestion();
                }, 1500);
            }

        });
    });
};

startGame();


// Incremeant score if answer is correct

const scoreUp = num => {
    score += num;
    scoreInfo.innerText = score;
}

// Function to call when there are no question left
// Diplay message depending on the score get by the user

endGame = () => {
    const totalScore = maxQuestions * bonusCorrectAnswer;
    gameSec.classList.add('hidden');
    end_box.classList.remove('hidden');
    finalScore.innerText = score + " / " + totalScore;

    if (score === (maxQuestions * bonusCorrectAnswer)) {
        endMessage.innerText = "Wow this is what I call perfection!";
    } else if (score >= ((maxQuestions / 5 * 4) * bonusCorrectAnswer)) {
        endMessage.innerText = "Great! Almost a perfect score!";
    } else if (score > ((maxQuestions / 2) * bonusCorrectAnswer)) {
        endMessage.innerText = "Well, you're above the average!";
    } else if (score >= ((maxQuestions / 5) * bonusCorrectAnswer)) {
        endMessage.innerText = "No bad, but you can do better!";
    } else {
        endMessage.innerText = "Ohh... you need a refresh!";
    }
};


playAgain.addEventListener('click', () => {
    gameSec.classList.remove('hidden');
    end_box.classList.add('hidden');
    startGame();
});
