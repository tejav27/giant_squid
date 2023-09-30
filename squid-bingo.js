const fs = require("fs");

// Read and parse the input file
const inputLines = fs
    .readFileSync("actualdata.txt", { encoding: "utf-8" })
    .split("\n\n")
    .filter((line) => Boolean(line))
    .map((line) =>
        line
            .replace(/[\n ,]+/g, " ") // Replace one or more spaces, commas, or newlines with a single space
            .trim()
            .split(" ")
            .map((number) => parseInt(number))
    );

// Extract the drawn numbers and bingo cards
let [drawnNumbers, ...bingoCards] = inputLines;

// Define a class to represent a Bingo card
class BingoCard {

    constructor(numbers) {
        this.cardSize = 5;
        this.numbers = numbers;
        this.numberToPosition = new Map();

        // Initialize the mapping of numbers to their positions on the card
        for (let i = 0; i < this.numbers.length; i++) {
            const n = this.numbers[i];
            this.numberToPosition.set(n, {
                row: Math.floor(i / this.cardSize),   // Store the row position of each number
                column: i % this.cardSize,            // Store the column position of each number
            });
        }

        this.rows = Array(this.cardSize).fill(0);
        this.columns = Array(this.cardSize).fill(0);
        this.isComplete = false;
        this.markedNumbers = new Set();
    }

    // Method to mark a number on the card
    markNumber(number) {
        const position = this.numberToPosition.get(number);
        if (!position) {
            return;
        }
        this.markedNumbers.add(number);       // Track marked numbers
        this.rows[position.row]++;            // Update the count of marked numbers in the row
        this.columns[position.column]++;      // Update the count of marked numbers in the column
        if (
            this.rows[position.row] === this.cardSize ||
            this.columns[position.column] === this.cardSize
        ) {
            this.isComplete = true;                 // Check if the card is complete after marking
        }
    }

    // Method to get unmarked numbers on the card
    unmarkedNumbers() {
        return this.numbers.filter((number) => !this.markedNumbers.has(number));
    }
}

// Function to find the last winning card and calculate the score
function findLastWinningCard(cards) {
    let lastWinningCard;
    let lastWinningNumber;
    const drawnNumbersHistory = [];

    for (const drawnNumber of drawnNumbers) {
        drawnNumbersHistory.push(drawnNumber);
        let hasIncompleteCards = false;

        // Check each card to see if it's complete after marking the number
        for (const card of cards) {
            if (!card.isComplete) {
                hasIncompleteCards = true;
                card.markNumber(drawnNumber);
                if (card.isComplete) {
                    lastWinningCard = card;
                    lastWinningNumber = drawnNumber;
                }
            }
        }

        if (!hasIncompleteCards) {
            break; // All cards are complete, so exit the loop
        }
    }

    // Calculate and print the score of the winning card
    const unmarkedNumbers = lastWinningCard.unmarkedNumbers();
    const score = unmarkedNumbers.reduce((total, number) => total + number, 0) * lastWinningNumber;
    console.log("The winning card's score is:", score);
}

// Convert input data into BingoCard objects
const bingoCardsObjects = bingoCards.map((cardNumbers) => new BingoCard(cardNumbers));

// Find the last winning card and calculate the score
findLastWinningCard(bingoCardsObjects);
