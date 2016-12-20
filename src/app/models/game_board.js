import Backbone from 'backbone';
// import $ from 'jquery';

const GameBoard = Backbone.Model.extend({
  initialize: function() {
    this.gameBoard = [];
    this.gameBoard[0] = [ null, null, null];
    this.gameBoard[1] = [ null, null, null];
    this.gameBoard[2] = [ null, null, null];
  },

  hasWon: function() {
    // var board = this.gameBoard;
    var row0 = this.gameBoard[0];
    var row1 = this.gameBoard[1];
    var row2 = this.gameBoard[2];

    if ((row0[0] == row0[1]  && row0[1] == row0[2] && row0[2] !== null) ||
        (row1[0] == row1[1]  && row1[1] == row1[2] && row1[2] !== null) ||
        (row2[0] == row2[1]  && row2[1] == row2[2] && row2[2] !== null)) {
      console.log("Winner in a row");
      return true;
    } else if ((row0[0] == row1[0] && row1[0] == row2[0] && row2[0] !== null) ||
                (row0[1] == row1[1] && row1[1] == row2[1] && row2[1] !== null) ||
                (row0[2] == row1[2] && row1[2] == row2[2] && row2[2] !== null)) {
      console.log("Winner in a column");
      return true;
    } else if ((row0[0] == row1[1] && row1[1] == row2[2] && row2[2] !== null) || (row0[2] == row1[1] && row1[1] == row2[0] && row2[0] !== null)) {
        console.log("Winner in a diagonal");
        return true;
    } else {
      if(this.aTie()){
        return "tie";
      } else {
        return false;
      }
    }
  },

  aTie: function() {
    var row0 = this.gameBoard[0];
    var row1 = this.gameBoard[1];
    var row2 = this.gameBoard[2];

    if((row0.includes(null)) || (row1.includes(null)) || (row2.includes(null))) {
      return false;
    } else {
      return true;
    }
  }
});

// DO NOT REMOVE THIS
export default GameBoard;
