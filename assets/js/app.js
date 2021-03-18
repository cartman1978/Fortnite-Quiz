// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('.info_container');
const quit_btn = document.querySelector('.buttons .quit');
const continue_btn = document.querySelector('.buttons .restart');
const quiz = document.querySelector('.quiz_box');

// If start button is clicked
start_btn.onclick = () => {
    info_container.classList.add("activeInfo"); //show info box

    
}

// If quit button is clicked

quit_btn.onclick = () => {
    info_container.classList.remove("activeInfo");
}

// If continue btutton is clicked

continue_btn.onclick = () => {
    info_container.classList.remove("activeInfo");
    quiz.classList.add("quizActive");
}