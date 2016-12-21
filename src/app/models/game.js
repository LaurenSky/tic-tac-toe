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
      name: "player 1"
    },
    player2: {
      marker: "O",
      turnId: false,
      name: "player 2"
    },
  },

  initialize: function() {
    this.board = new GameBoard();
    this.gameCounter = true;
    this.turnCounter = 0;
    this.winner = null;
    this.outcome = undefined;
  },

  playTurn: function(row, column) {
    if(this.winner == this.get('player1') || this.winner == this.get('player2') || this.winner === 'draw') {
      this.trigger('gameover', this);
      console.log("Game is Over " + this.winner.name + " won.");
      return "Game is Over " + this.winner.name + " won.";
    } else {
      var player = this.whichPlayer();

      if (this.valid(row, column)) {
        this.board.gameBoard[row][column] = player.marker;

        console.log('triggering change event');
        this.board.trigger('change', this.board, {});

        if (player == this.get('player1')) {
          this.gameCounter = false;
          this.turnCounter++;
        } else {
          this.gameCounter = true;
          this.turnCounter++ ;
        }

        if(this.turnCounter >= 5) {
          if(this.board.hasWon() === true) {
            console.log(player + " you're the Winner!!!");
            this.winner = player;
            this.outcome = player.marker;
            this.trigger('winner', this.winner);
            return player.name;
          } else if(this.board.hasWon() === "tie") {
            this.winner = 'draw';
            this.outcome = 'draw';
            this.trigger('catsgame', this, "cats game");
            console.log("Cat's Game, it's a tie.");
            // return "Cat's Game.";
          }
        }
      } else {
        this.trigger('invalid', this, "Position is already Taken", {});
        console.log("That position is already taken, go Again");
      }

      // console.log(this.board.gameBoard[0]);
      // console.log(this.board.gameBoard[1]);
      // console.log(this.board.gameBoard[2]);
      // console.log("who's turn: " + this.gameCounter);
      // console.log("round number: " + this.turnCounter);
    }
  },

  whichPlayer: function() {
    if (this.gameCounter === this.get('player1').turnId) {
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
  },

  toJSON: function() {
    var flattenedBoard = this.board.gameBoard.reduce(function(a, b) {
      return a.concat(b);
    }, []);

    var player1 = this.get('player1').name;
    var player2 = this.get('player2').name;
    var nowDateTime = new Date();


    var apiData = {
      'board': flattenedBoard,
      'players': [player1, player2],
      'outcome': this.outcome,
      'played_at': nowDateTime
    };

    console.log(apiData);
  }
});

// DO NOT REMOVE THIS
export default Game;
