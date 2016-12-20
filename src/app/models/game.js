import Backbone from 'backbone';
import $ from 'jquery';
import GameBoard from 'app/models/game_board';

const Game = Backbone.Model.extend({
  // This model should have the attributes for
  // a single contact: name, phone number, and email.
  defaults: {
    player1: {
      marker: "X",
      turnId: true,
      name: "player1"
    },
    player2: {
      marker: "O",
      turnId: false,
      name: "player2"
    },
    gameCounter: true,
    turnCounter: 0,
    winner: null
  },

  initialize: function() {
    this.board = new GameBoard();
  },

  playTurn: function(row, column) {
    if(this.get('winner') !== null) {
      console.log("Game is Over " + this.get('winner').name + " won.");
      return "Game is Over " + this.get('winner').name + " won.";
    } else {
      var player = this.whichPlayer();

      if (this.valid(row, column)) {
        this.board.gameBoard[row][column] = player.marker;

        if (player == this.get('player1')) {
          this.set('gameCounter', false);
          this.set('turnCounter', this.get('turnCounter') + 1);
        } else {
          this.set('gameCounter', true);
          this.set('turnCounter', this.get('turnCounter') + 1);
        }

        if(this.get('turnCounter') >= 5) {
          if(this.board.hasWon() === true) {
            console.log(player + " you're the Winner!!!");
            this.set('winner', player);
            return player.name;
          } else if(this.board.hasWon() === "tie") {
            console.log("Cat's Game, it's a tie.");
            // return "Cat's Game.";
          }
        }
      } else {
        console.log("That position is already taken, go Again");
      }
      console.log(this.board.gameBoard);
      console.log("who's turn: " + this.get('gameCounter'));
      console.log("round number: " + this.get('turnCounter'));
    }
  },

  whichPlayer: function() {
    if (this.get('gameCounter') === this.get('player1').turnId) {
      return this.get('player1');
    } else {
      return this.get('player2');
    }
  },

  valid: function(row,column) {
    if((row > 2) || (column > 2)) {
      console.log(row + "," + column + " is not a valid location");
      return false;
    } else {
      var locationValue = this.board.gameBoard[row][column];
      console.log("in valid, location value = " + locationValue);
      if (locationValue != 'X' && locationValue != 'O') {
        return true;
      } else {
        return false;
      }
    }
  }
});

// DO NOT REMOVE THIS
export default Game;
