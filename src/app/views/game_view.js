import Backbone from 'backbone';
import $ from 'jquery';

import Game from 'app/models/game';
import GameBoard from 'app/models/game_board';

import PlayerView from 'app/views/player_view';
import GameBoardView from 'app/views/gameboard_view';

const GameView = Backbone.View.extend({

  initialize: function() {

    var gameBoardView = new GameBoardView({
      el: '#gameboard-view',
      model: this.model.board
    });

    var playerView = new PlayerView({
      el: '#player-view'
    });

    this.listenTo(gameBoardView, 'selectSpace', this.playTurn);
    this.listenTo(this.model, 'invalid', this.spaceTaken);
    this.listenTo(this.model, 'gameover', this.gameOver);
    this.listenTo(this.model, 'winner', this.stateWinner);
    this.listenTo(this.model, 'catsgame', this.stateCatsGame);


    gameBoardView.render();
    playerView.render();
  },

  render: function() {

    return this;
  },

  events: {
    'click .start-game-button': 'startGame'
  },

  startGame: function() {
    console.log("Starting a game");

  },

  playTurn: function(event) {
    console.log(event);
    console.log(event.id);
    var locationClicked = event.id;
    var value = $(event).html();

    console.log(value);
    this.model.playTurn(locationClicked[0], locationClicked[1]);

    if(this.model.gameCounter === true) {
      $('.x-show').css('display', 'inline');
      $('.o-show').css('display', 'none');
    } else {
      $('.x-show').css('display', 'none');
      $('.o-show').css('display', 'inline');
    }
  },

  spaceTaken: function() {
    console.log("in spaceTaken");
    alert("That space is taken already, Go Again.");
  },

  gameOver: function() {
    console.log("in gameOver");
    alert("The Game's already over");
  },

  stateWinner: function () {
    console.log("in winner");
    alert("There's a winner ");
  },

  statecatsGame: function () {
    console.log("in winner");
    alert("It's a Cat's Game :(");
  }

});

export default GameView;
