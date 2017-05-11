import Backbone from 'backbone';
import $ from 'jquery';

import Game from 'app/models/game';
import GameBoard from 'app/models/game_board';
// import AllGames from 'app/collections/all_games';

import PlayerView from 'app/views/player_view';
import GameBoardView from 'app/views/gameboard_view';

const GameView = Backbone.View.extend({

  initialize: function(options) {

    var gameBoardView = new GameBoardView({
      el: '#gameboard-view',
      model: this.model.board
    });

    var playerView = new PlayerView({
      el: '#player-view'
    });

    // console.log("options");
    // console.log(options);
    this.gameList = options.completedGames;
    // console.log("all games");
    // console.log(this.gameList);

    this.listenTo(gameBoardView, 'selectSpace', this.playTurn);
    this.listenTo(this.model, 'invalid', this.spaceTaken);
    this.listenTo(this.model, 'gameover', this.gameOver);
    this.listenTo(this.model, 'winner', this.stateWinner);
    this.listenTo(this.model, 'catsgame', this.stateCatsGame);
    // this.listenTo(this.gameList, 'update', this.updateAllGames);

    gameBoardView.render();
    playerView.render();
  },

  render: function() {
    // this.showAllGames();

    return this;
  },

  events: {
    'click .start-game-button': 'startGame',
    'click .delete-button': 'deleteAGame'
  },

  startGame: function() {
    // console.log("Starting a game");
    location.reload();
  },

  playTurn: function(event) {
    // console.log(event);
    // console.log(event.id);
    $('#message-box').empty();
    $('#message-box').css('background-color', 'transparent');
    var locationClicked = event.id;
    var value = $(event).html();

    // console.log(value);
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
    // console.log("in spaceTaken");
    // alert("That space is taken already, Go Again.");
    $('#message-box').append("Space's Taken, Go Again.");
    $('#message-box').css('background-color', '#EA6E6E');
  },

  gameOver: function() {
    // console.log("in gameOver");
    // alert("The Game's already over");
    $('#message-box').append("Game's Over.");
    $('#message-box').css('background-color', '#EA6E6E');
  },

  stateWinner: function (winner) {
    // console.log("in winner");
    // console.log(winner);
    // alert("There's a winner ");
    $('#message-box').append("Winner: " + winner.name);
    $('#message-box').css('background-color', '#88D18A');

    // console.log(this.gameList);
    this.gameList.create(this.model);
    this.showAllGames();
  },

  stateCatsGame: function () {
    // console.log("in winner");
    // alert("It's a Cat's Game :(");
    $('#message-box').append("Cat's Game :(");
    $('#message-box').css('background-color', '#68ABBA');

    this.gameList.create(this.model);
    $('#all-games').empty();
    this.showAllGames();
  },

  showAllGames: function() {
    // console.log("in update all games");
    // console.log(this.gameList);

    var self = this;
    this.gameList.fetch().done(function() {
      $.each(self.gameList.models, function(index, game){
        // console.log('game:');
        // console.log(game);
        var row = $('<tr></tr>');
        var id = $('<td>' + game.id + '</td>');
        // console.log(game.id);
        var outcome = $('<td>' + game.outcome + '</td>');
        var button =  $('<td>' + '<input type="button" value="Delete" class="button delete-button"/>' + '</td>');

        row.append(id, outcome, button);
        $('#all-games').append(row);

      });
    });
  },

  deleteAGame: function(gameId) {
    // console.log("in delete function");
    // this.gameList.destroy(gameId);
  }
});

export default GameView;
