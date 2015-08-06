import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('systemDown');
  this.route('accessDenied');
  this.route('pageNotFound');
});

export default Router;
