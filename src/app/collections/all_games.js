import Backbone from 'backbone';

import Game from 'app/models/game';

var AllGames = Backbone.Collection.extend({
  model: game,
  url: 'http://localhost:3000/api/v1/games',
  parse: function(data){
    return data;
  }
});

export default AllGames;
