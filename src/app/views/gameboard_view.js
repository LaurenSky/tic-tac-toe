import Backbone from 'backbone';
import $ from 'jquery';

// import Game from 'app/models/game';

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
    console.log('array');
    console.log(array);
      $('#top-left').append(array[0][0]);
      $('#top-middle').append(array[0][0]);
      $('#top-right').append(array[0][0]);

      $('#middle-left').append(array[0][0]);
      $('#middle-middle').append(array[0][0]);
      $('#middle-right').append(array[0][0]);

      $('#bottom-left').append(array[0][0]);
      $('#bottom-middle').append(array[0][0]);
      $('#bottom-right').append(array[0][0]);
  }
});

export default GameBoardView;
