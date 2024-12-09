"use strict";


function getComputerChoice() {
	const randomChoiceIndex = Math.floor(Math.random() * 3);

	switch (randomChoiceIndex) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		case 2:
			return "scissors";
		default:
			return "rock";
	};
};


function getHumanChoice() {
	let humanChoice;
	do {
		humanChoice = prompt("Rock, paper or scissors?").toLowerCase();
	} while (!["rock", "paper", "scissors"].includes(humanChoice));

	return humanChoice;
}


function playRound(humanChoice, computerChoice) {
	// Returns 0 if its a draw, -1 if the computer wins, 1 if the human wins.

	if (humanChoice === computerChoice) {
		console.log(`Draw! ${humanChoice} neither beats nor is beaten by ${computerChoice}.`);
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


function printScore(humanScore, computerScore) {
	console.log(`Human: ${humanScore} points | Computer ${computerScore} points`);
}


function determineWinner(humanScore, computerScore) {
	if (humanScore === computerScore) {
		console.log("It's a draw!");
	} else if (humanScore > computerScore) {
		console.log("You win!");
	} else {
		console.log("You lose!");
	}
}


function playGame() {
	let humanScore = 0;
	let computerScore = 0;

	for (let i = 0; i < 5; i++) {
		const computerChoice = getComputerChoice();
		const humanChoice = getHumanChoice();

		const outcomeHuman = playRound(humanChoice, computerChoice);

		if (outcomeHuman === -1) {
			computerScore++;
			console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
		} else if (outcomeHuman === 1) {
			humanScore++;
			console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
		}

		printScore(humanScore, computerScore);
	}

	determineWinner(humanScore, computerScore);
}

const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
let humanChoice;

rockButton.addEventListener("click", () => {
	humanChoice = "rock";
	console.log(humanChoice)
});

paperButton.addEventListener("click", () => {
	humanChoice = "paper";
	console.log(humanChoice)
});

scissorsButton.addEventListener("click", () => {
	humanChoice = "scissors";
	console.log(humanChoice)
});