import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('systemDown');
  this.route('accessDenied');
  this.route('pageNotFound');
  this.route('notImplemented');
});

export default Router;
