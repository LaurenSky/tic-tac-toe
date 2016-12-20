import Backbone from 'backbone';
import $ from 'jquery';

import GameBoard from 'app/models/game_board';

var GameBoardView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);

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
    console.log('in gameBoardView.render');
    var array = this.model.gameBoard;
    console.log(array);

    $('#00').empty();
    $('#00').append(array[0][0]);
    $('#01').empty();
    $('#01').append(array[0][1]);
    $('#02').empty();
    $('#02').append(array[0][2]);

    $('#10').empty();
    $('#10').append(array[1][0]);
    $('#11').empty();
    $('#11').append(array[1][1]);
    $('#12').empty();
    $('#12').append(array[1][2]);

    $('#20').empty();
    $('#20').append(array[2][0]);
    $('#21').empty();
    $('#21').append(array[2][1]);
    $('#22').empty();
    $('#22').append(array[2][2]);

    return this;
  }
});

export default GameBoardView;
