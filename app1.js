// Define variables in the global scope for access
var score, roundScore, activePlayer, playingGame;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (playingGame) {
        // Create a random number from 1 to 6 to represent the dices
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the dice image
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
    

        // Check the dice for 1. If 1 is rolled, switch players, else current player stays playing
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score to roundScore
            roundScore += dice1 + dice2;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            // change activePlayer to nextPlayer
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    // Update the score
    score[activePlayer] += roundScore;

    // Update the UI of score
    document.getElementById("score-" + activePlayer).textContent = score[activePlayer];

    // Grab value from input and define var to assign value in conditional
    var input = document.querySelector(".final-score").value;
    var winnigScore;

    // udefined, null, "", 0, and false are COERCED false - In the console, neither undefined nor null COERCED to false
    if (input) {
        winnigScore = input;
    } else {
        winnigScore = 100;
    }

    // Check for winner
    if (score[activePlayer] >= winnigScore) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!";
        hideDices();
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        document.getElementById("current-0").textContent = 0;
        document.getElementById("current-1").textContent = 0;
        roundScore = 0;
        playingGame = false;
    } else {
        // Change activePlayer
          nextPlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    hideDices();
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active"); // notice the parethesis for toggle as it is a method
    document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playingGame = true;

    hideDices();
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

function hideDices() {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}
