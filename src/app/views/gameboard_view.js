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

    return this;
  }

});

export default GameBoardView;
