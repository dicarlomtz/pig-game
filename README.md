# Pig Game

Pig Game is a simple web page game with a dice and two players. This is a little project to put some DOM manipulation concepts into practice.

## Requirements

You do not need anything installed in your computer, just download the project and run the index.html in your browser by double clicking on it!

## How To Play

First, Player 1 will start the game by making a move with the dice
and the result will be added in Player 1 current points, then Player 1 will decide to continue dicing or holding the current points. If the Player 1 keeps dicing, then each result will be added to the current points. When Player 1 decides to hold, the current score will be added to the global score of Player 1 and the next turn will be for Player 2, same flow applies.

## Gotchas

- If dice 1 appears, current player will lost all the points and the next turn will be for the other player
- Every time the current player holds current values, then the next turn will be for the other player
- First player with 100 points wins, winner player screen will turn into green.
