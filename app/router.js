import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //NOTE: error could be remove from the path if you don't like to see it.
  this.route('error', { path: '/error/:responseCode/:errorMessageKey' });
});

export default Router;
