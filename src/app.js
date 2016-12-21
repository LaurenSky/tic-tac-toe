import Backbone from 'backbone';
import $ from 'jquery';

import Game from 'app/models/game';
import AllGames from 'app/collections/all_games';

import GameView from 'app/views/game_view';



$(document).ready(function() {
  var game = new Game();
  // var allGames = new AllGames();

  var gameview = new GameView({
    el: '#game-view',
    // model: allGames
    model: game
  });

  gameview.render();
});
