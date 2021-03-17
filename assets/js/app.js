// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('.info_container');
const quit_btn = document.querySelector('.buttons .quit');

// If start button is clicked
start_btn.onclick = () => {
    info_container.classList.add("activeInfo"); //show info box

    
}

// If quit button is clicked

quit_btn.onclick = () => {
    info_container.classList.remove("activeInfo");
}