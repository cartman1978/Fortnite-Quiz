// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('#info-container');
const startButton = document.querySelector('#startButton');
const quitBtn = document.querySelector('#quit');
const continueBtn = document.querySelector('#start');
const quiz_box = document.querySelector('.quiz_box');
const end_box = document.querySelector('#endBox');
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector(" header .time_line");
const timeOff = quiz_box.querySelector(" header .time_text");
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
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const leaderBox = document.querySelector('#leader-board');
const leaderBtn = document.querySelector('#show-leaderboard');
const exitLeaderBox = document.querySelector('#exitLeader');
const username = document.querySelector('#username');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const scoreList = document.querySelector('#scoreList');
const userScore = JSON.parse(localStorage.getItem("userScore")) || [];
// const max_high_score = 5;
console.log(userScore);

let currentQuestion = {};
let questionCounter = 0;
let gettingAnswer = false;
let score = 0;
let availableQuestions = [];
const bonusCorrectAnswer = 10;
const maxQuestions = 10;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;


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

//  If Play Quiz button is clicked, show 
playGame.addEventListener('click', () => {
    quiz_box.classList.remove('hidden');
    startGame();
});


let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        // questions = loadedQuestions;
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestions => {
            const questionFormatted = {
             question: loadedQuestions.question,
            };

            const answerChoices = [ ...loadedQuestions.incorrect_answers];
            questionFormatted.answer = Math.floor(Math.random()*3) + 1;
            answerChoices.splice(questionFormatted.answer -1, 0, loadedQuestions.correct_answer);

            answerChoices.forEach((choice, index) => {
                questionFormatted["choice" + (index + 1)] = choice;
            })
            return questionFormatted;
        });
        startGame();
    })
    .catch((err) => {
        console.log(err);
    });


// Function to start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    scoreInfo.innerText = score;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    clearInterval(counter);
    startTime(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    getNextQuestion();
    timeOff.textContent = "Time Left";
}


// Function to get new questions 
getNextQuestion = () => {
    if (availableQuestions.length === 0) {
        // save user score
        localStorage.setItem("mostRecentScore", score);
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
               
                    clearInterval(counter);
                    clearInterval(counterLine);
                    startTime(15);
                    startTimerLine(0);
                    getNextQuestion();
                }, 1500);
            }

        });
    });
};


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

// When game is finish end box is displayed
// If Play again button is clicked, show game_box and restart the game

playAgain.addEventListener('click', () => {
    // gameSec.classList.remove('hidden');
    end_box.classList.add('hidden');
    quiz_box.classList.remove('hidden');
    // startGame();
});

// When game is finish end box is displayed
// If exit button is clicked, return to home page

exitBtn.addEventListener('click', () => {
   end_box.classList.add('hidden');
   
});

// If LeaderBoard button is clicked, show leaderboard box
leaderBtn.addEventListener('click', () => {
     leaderBox.classList.remove('hidden');
     startGame();
});

// Once in the Leaderboard box, if user click exit
// close Leaderboard box
exitLeaderBox.addEventListener('click', () => {
     leaderBox.classList.add('hidden');
});

// Save Score function

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
   console.log(username.value);
   saveScoreBtn.disabled = !username.value;
});

saveScore = e => {
    console.log('score saved');
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    // store more than one user score
    userScore.push(score);
    // function to sort score from highst to lowest
    userScore.sort((a,b) => b.score - a.score);
    // number of high score we want to store
    userScore.splice(5);
    // Save user scores in localstorage
    localStorage.setItem('userScore', JSON.stringify(userScore));
    
}

// Load and dispaly User High score from local storage
scoreList.innerHTML = 
userScore.map(score => {
   return `<li class = "user-score">${score.name} - ${score.score}</li>`;
}).join("");

// clear input after submit
 saveScoreBtn.addEventListener('click', () => {
      document.getElementById('username').value = '';
    });

// Function to start time counter
function startTime(time) {
   counter = setInterval(timer, 1000);
       function timer() {
         timeCount.textContent = time;
         time --;
         if (time < 9) {
             let addZero = timeCount.textContent;
             timeCount.textContent = "0" + addZero;
         }
         if (time < 0) {
             clearInterval(counter);
             timeCount.textContent = "00";
             timeOff.textContent = "Time Off";

         }
       }
   
};

// Function to start timeLine
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}