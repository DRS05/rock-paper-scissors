"use strict";

function showComputerChoice(computerChoice) {
	const computerChoiceImage = document.querySelector("#computer-choice-image");
	const computerChoiceParagraph = document.querySelector("#computer-choice-paragraph");

	computerChoiceImage.src = `images/${computerChoice}.png`;
	computerChoiceParagraph.textContent = computerChoice;
}


function getComputerChoice() {
	const randomChoiceIndex = Math.floor(Math.random() * 3);
	const rpsChoices = ["rock", "paper", "scissors"];

	const computerChoice = rpsChoices[randomChoiceIndex];

	showComputerChoice(computerChoice);

	return computerChoice;
};


function evaluateRound(humanChoice, computerChoice) {
	// Returns 0 if its a draw, -1 if the computer wins, 1 if the human wins.

	if (humanChoice === computerChoice) {
		return 0;
	}
	
	if (humanChoice === "rock" && computerChoice === "paper") {
		return -1;
	} else if (humanChoice === "paper" && computerChoice === "scissors") {
		return -1;
	} else if (humanChoice === "scissors" && computerChoice === "rock") {
		return -1;
	} else {
		return 1;
	}
}


function resetGame() {
	window.location.reload();
}


function showPlayAgainButton() {
	const playAgainButton = document.querySelector(".play-again-button");

	playAgainButton.style.display = "block";

	playAgainButton.addEventListener("click", resetGame);
}


function determineWinner(humanScore, computerScore) {
	if (humanScore < 5 && computerScore < 5) {
		return;
	}
	const gameResultsParagraph = document.querySelector("#game-results");

	if (humanScore > computerScore) {
		gameResultsParagraph.textContent = "You win!";
	} else {
		gameResultsParagraph.textContent = "Computer wins!";
	}

	showPlayAgainButton();
}


function showNewScores(humanScore, computerChoice) {
	const playerScoreDiv = document.querySelector("#player-score");
	const computerScoreDiv = document.querySelector("#computer-score");

	playerScoreDiv.textContent = humanScore;
	computerScoreDiv.textContent = computerChoice;
}


function showHumanChoice(humanChoice) {
	const playerChoiceImage = document.querySelector("#player-choice-image");
	const playerChoiceParagraph = document.querySelector("#player-choice-paragraph");
	
	playerChoiceImage.src = `images/${humanChoice}.png`;
	playerChoiceParagraph.textContent = humanChoice;
}


function showRoundWinner(outcomeHuman, humanChoice, computerChoice) {
	const roundWinnerParagraph = document.querySelector("#round-winner");

	if (outcomeHuman === -1) {
		roundWinnerParagraph.textContent = `Round lost! ${computerChoice} beats ${humanChoice}`;
	} else if (outcomeHuman === 1) {
		roundWinnerParagraph.textContent = `Round win! ${humanChoice} beats ${computerChoice}`;
	} else {
		roundWinnerParagraph.textContent = `Round draw! ${humanChoice} and ${humanChoice} do not beat each other.`;
	}
}

function playRound(event, gameState) {
	const computerChoice = getComputerChoice();

	let humanChoice;

	const button = event.target.closest("button");
	switch (button.id) {
		case "rock-button":
			humanChoice = "rock";
			break;
		case "paper-button":
			humanChoice = "paper";
			break;
		case "scissors-button":
			humanChoice = "scissors";
			break;
	}

	showHumanChoice(humanChoice);

	const outcomeHuman = evaluateRound(humanChoice, computerChoice);

	if (outcomeHuman === -1) {
		gameState.computerScore++;
	} else if (outcomeHuman === 1) {
		gameState.humanScore++;
	}

	showRoundWinner(outcomeHuman, humanChoice, computerChoice);
	showNewScores(gameState.humanScore, gameState.computerScore);

	determineWinner(gameState.humanScore, gameState.computerScore, gameState);
}


function playGame() {
	const gameState = {
		humanScore: 0,
		computerScore: 0
	};

	showNewScores(gameState.humanScore, gameState.computerScore);

	const rpsButtons = document.querySelector("#rps-buttons");

	rpsButtons.addEventListener("click", event => {
		if (gameState.humanScore < 5 && gameState.computerScore < 5) {
			playRound(event, gameState);
		}
	});
}

playGame();