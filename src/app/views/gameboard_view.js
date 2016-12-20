import Backbone from 'backbone';
import $ from 'jquery';

// import Game from 'app/models/game';
import GameBoard from 'app/models/game_board';

var GameBoardView = Backbone.View.extend({

  initialize: function() {

  },

  events: {
    'click td': 'spaceClick'
  },

  spaceClick: function(event) {
    this.trigger('selectSpace', event.currentTarget);

    // We return false to tell jQuery not to run any more event handlers.
    // Otherwise, it would run the 'click' event handler on RolodexView
    // as well.
    return false;
  },

  render: function() {
    var array = this.model.gameBoard;
    console.log(array[0]);
    console.log(array[0][0]);
      $('#top-left').append(array[0][0]);
      $('#top-middle').append(array[0][1]);
      $('#top-right').append(array[0][2]);

      $('#middle-left').append(array[1][0]);
      $('#middle-middle').append(array[1][1]);
      $('#middle-right').append(array[1][2]);

      $('#bottom-left').append(array[2][0]);
      $('#bottom-middle').append(array[2][1]);
      $('#bottom-right').append(array[2][2]);

    return this;
  }
});

export default GameBoardView;
