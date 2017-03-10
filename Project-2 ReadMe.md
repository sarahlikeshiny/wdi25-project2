# Project-2

<h1> Rockstagram </h1>
<h2> GA WDI London, Project 2, Mar 2017.</h2>

Rockstagram is a web app built in 

* This game is built in HTML5, CSS and Javascript with jQuery. 
* Animation was created using the Animate.css style sheet.
* The game is deployed via Heroku. (https://frozen-journey-66349.herokuapp.com/)
* The google web font 'Bungee' was used to style the game.

This is a browser hosted version of the game, for optimnal functionality Google Chrome is recommended. 

<h3> Instructions for Play</h3>
This version of hangman has two play modes, the standard mode, which started automatically when the page loads, and speed mode which is started by clicking the speed mode button. Clicking the New Game button will reset the gane board, clicking the speed mode button will start the timer.

![](images/start-screen.png)

***The standard game is played as follows;***

1. A word is generated at random from a list and is displayed on the scrren as underscores.
2. The user guesses a letter by typing the guess into the text box and pressing enter
3. Correct answers will be displayed in their correct position in the word, incorrect answers will be displayed below the input box and a part of the man will be drawn
4. If the man is drawn before the word is guessed you lose (7 guesses)
5. If the word is guessed before the man is drawn you win!

***Speed mode is played as follows***

![](images/speed-mode-game-play.png)

1. Clicking the new game button and then the speed mode button starts speed mode.
2. You have 35 seconds to guess the word or the man will hang!
3. Another part of the man will be drawn every 5 seconds 
4. The game ends when the man is fully drawn or the word is guessed.

 

<h3>Unsolved Problems </h3> 
* The game is currently not responsive, and will not display properly on small screens
* The code is not namespaced
* The code has not been translated to ES5 or minified.

<h3>Challenges </h3> 
The most challenging game logic to solve was to match the user guesses with the random word and to display the correct guesses in the appropriate position in the word. I achieved this creating an array of correct characters and looping through this array to swap the underscores in the appropriate positions for the letters, and then making this array into a string in order to display it. 

Styling the game was also challenging, espcially positioning the footer at the base of the page given the relatively empty page. I achieved this by creating an empty wrapper div to fill the space. 



