// Show the modal with a message
const showModal = (message) => {
    const modal = document.getElementById("eventModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerText = message;
    modal.style.display = "block";
};

// Hide the modal
const hideModal = () => {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none";
};

// Close the modal when the close button is clicked
document.getElementById("closeModal").onclick = hideModal;

// Close the modal if the user clicks outside of it
window.onclick = (event) => {
    const modal = document.getElementById("eventModal");
    if (event.target === modal) {
        hideModal();
    }
};

// Main game logic
const rollDice = () => {
    const player1DiceRoll = Math.floor(Math.random() * 6) + 1;
    const player2DiceRoll = Math.floor(Math.random() * 6) + 1;
    const player1HealthElement = document.getElementById("player1Health");
    const player2HealthElement = document.getElementById("player2Health");
    let player1Health = parseInt(player1HealthElement.innerText);
    let player2Health = parseInt(player2HealthElement.innerText);

    let loser;
    if (player1DiceRoll < player2DiceRoll) {
        loser = 1;
    } else if (player2DiceRoll < player1DiceRoll) {
        loser = 2;
    } else {
        showModal("It's a tie! Roll again.");
        return;
    }

    // Update dice images
    document.getElementById("player1Dice").src = `images/dice-six-faces-${player1DiceRoll}.png`;
    document.getElementById("player2Dice").src = `images/dice-six-faces-${player2DiceRoll}.png`;

    // Apply effects based on dice rolls
    if (loser === 1) {
        let damage = 10;
        if (player2DiceRoll === 6) {
            showModal("Critical strike by Player 2! Extra damage dealt!");
            damage += 10; // Extra damage for critical strike
        }
        player1Health = Math.max(player1Health - damage, 0); // Ensure health doesn't go below 0
        player1HealthElement.innerText = player1Health;
    } else {
        let damage = 10;
        if (player1DiceRoll === 6) {
            showModal("Critical strike by Player 1! Extra damage dealt!");
            damage += 10; // Extra damage for critical strike
        }
        player2Health = Math.max(player2Health - damage, 0); // Ensure health doesn't go below 0
        player2HealthElement.innerText = player2Health;
    }

    // Healing roll for rolling 1 or 2
    if (player1DiceRoll <= 2) {
        showModal("Player 1 heals 5 health!");
        player1Health = Math.min(player1Health + 5, 100); // Ensure health doesn't exceed 100
        player1HealthElement.innerText = player1Health;
    }
    if (player2DiceRoll <= 2) {
        showModal("Player 2 heals 5 health!");
        player2Health = Math.min(player2Health + 5, 100); // Ensure health doesn't exceed 100
        player2HealthElement.innerText = player2Health;
    }

    // Check for game over
    if (loser === 1 && player1Health <= 0) {
        showModal("Player 1 loses the game!");
        resetGame();
    } else if (loser === 2 && player2Health <= 0) {
        showModal("Player 2 loses the game!");
        resetGame();
    }
};

// Reset the game to the initial state
const resetGame = () => {
    console.clear();
    const player1HealthElement = document.getElementById("player1Health");
    const player2HealthElement = document.getElementById("player2Health");
    player1HealthElement.innerText = "100";
    player2HealthElement.innerText = "100";
};
