import Backbone from 'backbone';
import $ from 'jquery';

import Game from 'app/models/game';
import PlayerView from 'app/views/player_view';
import GameBoardView from 'app/views/gameboard_view';

const GameView = Backbone.View.extend({

  initialize: function() {
    var gameBoardView = new GameBoardView({
      el: '#gameboard-view'
    });

    var playerView = new PlayerView({
      el: '#player-view'
    });

    this.listenTo(gameBoardView, 'selectSpace', this.playTurn);

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
    console.log(event.id);
    var locationClicked = event.id;

    // this.model.playTurn();
    // var player = ;
    // var marker = "X";
    //
    //
    // event.currentTarget.append(marker);
  }

});

export default GameView;
