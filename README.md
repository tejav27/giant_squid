# Bingo Game With Giant Squid

This is a simple simulator for a Bingo game where multiple Bingo cards compete to be the last one to win. The program tracks which Bingo cards have already won and calculates the score of the winning card.

## Problem Description

The problem involves simulating a Bingo game with multiple Bingo cards. The objective is to find the last Bingo card that wins the game and calculate its score.

### Rules

- A Bingo card wins if it completes a row or a column by marking all the required numbers.
- The score of the winning card is calculated by summing the unmarked numbers on the card and multiplying the sum by the number that was just drawn when the card won.

## How to Use

**Running the Program**: 

- Ensure Node.js is installed on the system.
- Save the input data in a file called `real-input-data.txt`. A couple of input data files are included for use.
- Open a terminal and navigate to the project directory.
- Run the program using the following command:

  ```
  node squid-bingo.js
  ```

**Output**: The program will display the winning Bingo card's score.

## Code Explanation

The code is written in JavaScript and consists of classes and functions to simulate the Bingo game. Here's an overview of key components:

- `BingoCard` class: Represents a Bingo card with methods to mark numbers, check completeness, and calculate the score.

- `findLastWinningCard` function: Implements the logic to find the last winning card and calculate its score.

- Input is read from a text file and parsed to create Bingo card objects.

- The program tracks marked numbers, rows, columns, and card completeness.

- The score of the last winning card is displayed as output.