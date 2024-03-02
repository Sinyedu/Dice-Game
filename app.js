const rollDice = () => {
    const player1DiceRoll = Math.floor(Math.random() * 6) + 1;
    const player2DiceRoll = Math.floor(Math.random() * 6) + 1; 
    const player1HealthElement = document.getElementById("player1Health");
    const player2HealthElement = document.getElementById("player2Health");
    const player1Health = parseInt(player1HealthElement.innerText);
    const player2Health = parseInt(player2HealthElement.innerText);


    let loser;
    if (player1DiceRoll < player2DiceRoll) {
        loser = 1;
    } else if (player2DiceRoll < player1DiceRoll) {
        loser = 2;
    } else {
        alert("It's a tie! Roll again.");
        return;
    }


    document.getElementById("player1Dice").src = `images/dice-six-faces-${player1DiceRoll}.png`;
    document.getElementById("player2Dice").src = `images/dice-six-faces-${player2DiceRoll}.png`;


    if (loser === 1) {
        player1HealthElement.innerText = player1Health - 10;
    } else {
        player2HealthElement.innerText = player2Health - 10;
    }


    if (loser === 1 && player1Health - 10 <= 0) {
        alert("Player 1 loses the game!");
        resetGame();
        rollDice();
    } else if (loser === 2 && player2Health - 10 <= 0) {
        alert("Player 2 loses the game!");
        resetGame();
        rollDice();
    }
};

const resetGame = () => {
    console.log("Resetting game...");
    const player1HealthElement = document.getElementById("player1Health");
    const player2HealthElement = document.getElementById("player2Health");
    player1HealthElement.innerText = "100";
    player2HealthElement.innerText = "100";
};

rollDice();