// getting all the elements

const start_btn = document.querySelector('.start_btn button');
const info_container = document.querySelector('.info_container');


// If start button is clicked
start_btn.onclick = () => {
    info_container.classList.add("activeInfo"); //show info box
    console.log('button clicked');
    
}