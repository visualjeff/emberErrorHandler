import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return {
      responseCode: params.responseCode,
      messageKey: params.errorMessageKey,
    };
  },

});
