// getting all the elements


const infoContainerRef = document.querySelector('#info-container');
const startButton = document.querySelector('#startButton');
const quitBtn = document.querySelector('#quit');
const continueBtn = document.querySelector('#start');
const quizBoxRef = document.querySelector('.quizBox');
const endBoxRef = document.querySelector('#endBox');
const timeCount = quizBoxRef.querySelector(".timer .timerSec");
const timeLine = quizBoxRef.querySelector("header .timeLine");
const timeOff = quizBoxRef.querySelector("header .timeText");
const endMessage = document.querySelector('.endMessage');
const errorText = document.querySelector('#error-text');
const exitBtn = document.querySelector('#exit');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choices'));
const finalScore = document.querySelector('#finalScore');
const scoreInfo = document.querySelector('#score');
const questionText = document.querySelector('.questionText');
const progressFull = document.querySelector('#progressFull');
const progressText = document.querySelector('#progressText');
const gameSec = document.querySelector('#game-section');
const scoreSaved = document.querySelector('#scoreSaved');
const saveScore = document.querySelector('#saveScore');

const btnContainer = document.querySelector('.btnContainer');
const rulesContainerRef = document.querySelector('#rules');
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
let queNum = 1;

// If Quiz rule button is clicked
rulesContainerRef.addEventListener('click', () => {
    btnContainer.classList.add('hidden');
    infoContainerRef.style.display = "inline-block";
});

//If Continue OK is clicked, remove info box and diplay buttons again
continueBtn.addEventListener('click', () => {
    infoContainerRef.style.display = "none";
    btnContainer.classList.remove('hidden');
});

//  If Play Quiz button is clicked, show 
playGame.addEventListener('click', () => {
    quizBoxRef.classList.remove('hidden');
    startGame();
});


let questions = [];

// Fetching data from Trivia Api
const fetchData = (url) => {
    return fetch(url).then(res => res.json())
    .catch(error => {
        errorText.innerHTML = `Arrr! It seems that your not lucky. Please try to refresh the page.`;
        console.log(error);
    });
}



/**
 * Function to get questions from API and passes to the DOM
 */
 const fetchQuestions = fetchData('https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple');



fetchQuestions.then((data) => {
    questions = data.results.map(fetchQuestions => {
        const questionFormatted = {
            question : fetchQuestions.question,
        };

        questionFormatted.answer = Math.floor(Math.random() * 3) + 1;
        const answerChoices = [ ... fetchQuestions.incorrect_answers];
        answerChoices.splice(questionFormatted.answer -1, 0, fetchQuestions.correct_answer);

        answerChoices.forEach((choice, index) => {
            questionFormatted['choice' + (index + 1)] = choice;
        });
        return questionFormatted;
        console.log(questionFormatted)
    });
    startGame();
}).catch(error => {
    errorText.innerHTML = `Arrr! It seems that your not lucky. Please try to refresh the page.`;
    console.log(error);
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
        question.innerHTML = currentQuestion.question;
         

        choices.forEach(choice => {
            const number = choice.dataset.number;
            choice.innerHTML = currentQuestion["choice" + number];
        });


        //    Remove current question from available questions to avoid question repeatition 
        availableQuestions.splice(questionIndex, 1);
        gettingAnswer = true;
        validateUserAnswer();
      
    }
};


/**
 * Validate user selected answer 
 * if answer is correct, selected answer will highlight green
 *  if answer is incorrect, selected answer will highlight red
 */
const validateUserAnswer = () => {
    choices.forEach((choice) => {
        choice.addEventListener('click', (event) => {

            const choiceSelected = event.target;
            const answerSelected = choiceSelected.dataset.number;
            if (!gettingAnswer) return;
            gettingAnswer = false;


            if (answerSelected == currentQuestion.answer) {

                choiceSelected.classList.add('correct');

                scoreUp(bonusCorrectAnswer);
                setTimeout(() => {
                    choiceSelected.classList.remove('correct');
                     clearInterval(counter);
                    clearInterval(counterLine);
                    startTime(15);
                    getNextQuestion();
                }, 1500);
            } else {
                const correctAnswerNum = currentQuestion.answer;
                const correctAnswer = document.querySelector(`[data-number="${correctAnswerNum}"]`);
                choiceSelected.classList.add('incorrect');
                setTimeout(() => {
                    correctAnswer.classList.add('correct');
                }, 900);
                setTimeout(() => {
                    choiceSelected.classList.remove('incorrect');
                    correctAnswer.classList.remove('correct');
               
                    clearInterval(counter);
                    clearInterval(counterLine);
                    startTime(15);
                    getNextQuestion();
                }, 2500);
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
    endBoxRef.classList.remove('hidden');
    btnContainer.classList.add('hidden');
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
    endBoxRef.classList.add('hidden');
    btnContainer.classList.remove('hidden');
    location.reload();
  
});

// When game is finish end box is displayed
// If exit button is clicked, return to home page

exitBtn.addEventListener('click', () => {
  endBoxRef.style.display = 'none';
  btnContainer.style.display = 'block';
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


// Function to save user score
saveScoreBtn.addEventListener('click', (e) => {
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

    saveScoreBtn.classList.add('hidden');
    username.classList.add('hidden');
    scoreSaved.classList.remove('hidden');
    saveScore.classList.add('hidden');
})
    


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
            
            let theAnswer = currentQuestion.answer;
            let answerToShow = document.querySelector(`[data-number="${theAnswer}"]`);
             clearInterval(counter);
             startTime(15);
             getNextQuestion();
        
         }
       }
   
};


