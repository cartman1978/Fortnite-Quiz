# Video Game Quizzes

## **Goal for this project** 

Welcome to Video Game Quizzes !

Are you a videogamer and you looking to test your gaming knowledge ?
So let's get started and have fun!

Thank you for visiting my project!
If you have any feedback or questions, head over to my GitHub contact details and feel free to reach out to me.

---
<a></a>
## Table of contents
* [UX](#ux)
    * [User Goals](#user-goals)
    * [User Stories](#user-stories)
    * [Site Owners Goals](#site-owners-goals)
    * [User Requirements and Expectations](#user-requirements-and-expectations)
        * [Requirements](#requirements)
        * [Expectations](#expectations)
    * [Design Choices](#design-choices)
        * [Fonts](#fonts)
        * [Colors](#colors)
        * [Structure](#structure)
* [Wireframes](#wireframes)
* [Features](#features)
    * [Existing Features](#existing-features)
    * [Features to be implemented](#features-to-be-implemented)
* [Technologies used](#technologies-used)
    * [Languages](#languages)
    * [Libraries and Frameworks](#libraries-and-frameworks)
    * [Tools](#tools)
* [Testing](#testing)
* [Deployment](#deployment)
* [Credits](#credits)
* [Closing Note](#closing-note)


<a name="ux"></a>
## **UX**
<a></a>
### **User Goals**

* The game has to be repsonsive for all the devices sizes like tablets, phones and desktops
* Display feedback for correct/incorrect answers
* Display a visual progress bar to track user's progress through the questions
* During the game track the number of questions 
* Visual appealing website

[Back to Top](#table-of-contents)

<a></a>

### **User Stories**
* As a user, I would like to know the rules of the game before playing.
* As a user, I would like to know how many time left I have to answer the question.
* As a user, I would like to know the correct answer when answered incorrectly.
* As a user, I expect that the game has a nice visually appealing lay out to be in line with the game.
* As a user, I expect a variety of questions so no questions get repeated.
* As a user, I would like to learn new things about Videogames while I'm playing the game.
* As a user, I want to know where I am in the game, to know how many questions I still have left.
* As a user, I want to be able to restart the game once is over.
* As a user, I want to be able to save my score.
* As a user, I would like to compare my score whit other players.

<a></a>

### **Site owners Goals**
* To have an appealing website where users want to go to Test their Videogame knowledge.
* For the users to have fun while playing my game.


[Back to Top](#table-of-contents)

<a></a>
### **User Requirements and Expectations**
<a></a>
#### Requirements
* Easy to navigate 
* Appealing homepage
* Easy way to understand game rules and start the game
* Validate the correct answer
* Store the score of the user playing

<a></a>
#### Expectations
* Show which number of the questions user is in
* To let the user know if their answer was correct or wrong
* Show correct answer when answered incorrectly
* To show the final result after playing
* Show a personalised message with funny iamge after completing the game 

[Back to Top](#table-of-contents)

<a></a>
### **Design Choices**

I have used [Coolors](https://coolors.co/ "Coolors.co") to create a color scheme that matches the atmosphere of playing Fortnite Game.
The design choosed is simple but I would like to create cool and animated background.

<a></a>
#### Fonts
I have visited [Google Fonts](https://fonts.google.com/ "Google Fonts") to explore the various options.
For the title of my game, I have used the font [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro?preview.text_type=custom). 


<a></a>
#### Colors

I have decide to use some colors that reminds the background image used.

* Color #D12D6F is used for some buttons, progression bar and the endgame container.
* Color #E05A5C is used for main game box container.
* Colot #7A2D8D is used for the 4 possible answers to the questions.
* Colot #fff is used for all the text and headings. 

![Color Palette](wireframes/videogame-color.png)

[Back to Top](#table-of-contents)

## **Wireframes**

For the wireframes design I decide to use [Balsamic](https://balsamiq.com/wireframes/). First I created a basic wireframe for mobile and after I created the one for desktop and tablet.

Below you can find my wireframes:

### Mobile Wireframes
* [Homepage](wireframes/mobile-wireframe.jpg)

### Tablet Wireframes
* [Homepage](wireframes/tablet-wireframe.jpg)

### Desktop Wireframes
* [Homepage](wireframes/desktop-wireframe.jpg)

[Back to Top](#table-of-contents)

---

<a></a>
## **Features**
<a></a>
### **Existing Features**

* Use of [open Trivia API](https://opentdb.com/) 
* Answer validation
* Feedback provided if answer is incorrect
* Questions progression 
* Timer countdown for each question
* Score update while user is playing
* Personal message when game is over depending on the   final score
* User score can be saved in local storage 
* Leaderboard with top 5 scores

<a></a>
### **Features to be implemented**
* Database to proper save and render user scores
* Add different images for each questions
* Implement difficulty to be choosen by users

[Back to Top](#table-of-contents)

<a></a>

## **Technologies used**
<a></a>

### **Languages**

* [HTML](https://en.wikipedia.org/wiki/HTML)
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

<a></a>

### **Libraries and Frameworks**

* [Font Awesome](https://fontawesome.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Google Fonts](https://fonts.google.com/)
* [Particle.js](https://vincentgarreau.com/particles.js/)

### **Tools**
* [GitPod](https://www.gitpod.io/)
* [Balsamic](https://balsamiq.com/wireframes/)
* [W3C HTML Validator](https://validator.w3.org/) 
* [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
* [Open Trivia Database](https://opentdb.com/)

[Back to Top](#table-of-contents)

<a></a>

## **Testing**
---
<a></a>

## Game Rules
#### User story: As a user, I would like to know the rules of the game before playing.

* **Plan**  
After the page is loaded, the user should have the option to click a button 'Quiz Rules' when they can read more about rules in place for this game.

* **Implementation**  
Adding an extra button when page is loaded with 'Quiz Rules'

