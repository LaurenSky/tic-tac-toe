import Backbone from 'backbone';
// import $ from 'jquery';

const GameBoard = Backbone.Model.extend({
  initialize: function() {
    this.gameBoard = [[ " ", " ", " "], [ " ", " ", " "], [ " ", " ", " "]];
    // this.set('gameBoard', [[ null, null, null], [ null, null, null], [ null, null, null]]);
  },

  hasWon: function() {
    // var board = this.gameBoard;
    var row0 = this.gameBoard[0];
    var row1 = this.gameBoard[1];
    var row2 = this.gameBoard[2];

    if ((row0[0] == row0[1]  && row0[1] == row0[2] && row0[2] !== " ") ||
        (row1[0] == row1[1]  && row1[1] == row1[2] && row1[2] !== " ") ||
        (row2[0] == row2[1]  && row2[1] == row2[2] && row2[2] !== " ")) {
      // console.log("Winner in a row");
      return true;
    } else if ((row0[0] == row1[0] && row1[0] == row2[0] && row2[0] !== " ") ||
                (row0[1] == row1[1] && row1[1] == row2[1] && row2[1] !== " ") ||
                (row0[2] == row1[2] && row1[2] == row2[2] && row2[2] !== " ")) {
      // console.log("Winner in a column");
      return true;
    } else if ((row0[0] == row1[1] && row1[1] == row2[2] && row2[2] !== " ") || (row0[2] == row1[1] && row1[1] == row2[0] && row2[0] !== " ")) {
        // console.log("Winner in a diagonal");
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

    if((row0.includes(" ")) || (row1.includes(" ")) || (row2.includes(" "))) {
      return false;
    } else {
      return true;
    }
  }
});

// DO NOT REMOVE THIS
export default GameBoard;
