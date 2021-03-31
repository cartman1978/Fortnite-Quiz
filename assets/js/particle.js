if(document.body.animate) {
    document.querySelector('#saveScoreBtn').addEventListener('click', pop);
}

function pop(e) {
    // Check if user click save button using keyboard
    if (e.clientX === 0 && e.clientY === 0) {
        const saveBtn = document.querySelector('#saveScoreBtn').getBoundingClientRect();
        const x = saveBtn.left + saveBtn.width / 2;
        const y = saveBtn.top + saveBtn.height / 2;
        for (let i = 0; i < 30; i++) {
            /**
            * call function createParticle 30 times
            * and pass the coordinates of the button for x and y values
            */
            createParticle(x, y);
        }
    } else {
        for (let i = 0; i < 30; i++) {
            /**
             * call function createParticle 30 times
             * since coordinates for the mouse needed, passing them as arguments
             */
            createParticle(e.clientX, e.clientY);
        }
    }
}

function createParticle(x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    // Calculate random size from 5px to 20px
    const size = Math.floor(Math.random() * 15 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // generate random color
    particle.style.background = `hsl(${Math.random() * 60 + 150}, 70%, 60%)`;

    // Generate random x and y destination within 75px distance from the mouse
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;

    // Store the animation in a variable to use later
    const animation = particle.animate([
        {
            /**
             * Set original position of the paticle
             * offset hla size of the particle width in order to center around the mouse
             */
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            opacity: 1
        },
        {
            // Define final coordinates as the second keyframe
            transform: `translate(${destinationX}px, ${destinationY}px)`,
            opacity: 0
        }
    ], {
            // Set random duration from 500 to 1500ms
            duration: Math.random() * 1000 + 500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            // Deley particle with random value of 200ms
            delay: Math.random() * 200
    });

    // Remove the element from the DOM when animatios in complete
    animation.onfinish = () => {
        particle.remove();
    };
}