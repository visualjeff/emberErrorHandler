import Ember from 'ember';
var fmt = Ember.String.fmt;
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',

/*
  handleResponse(status, headers, body) {
    if (status === 401) {
      var e = new Ember.Error("unauthorized");
      e.status = status;
      Ember.debug("========================");
      Ember.debug("headers: " + JSON.stringify(headers));
      Ember.debug("body: " + JSON.stringify(body));
      Ember.debug("error: " + JSON.stringify(e));
      Ember.debug("========================");
      return e;
    } else {
      return this._super(status, headers, body);
    }
  }
*/

});
