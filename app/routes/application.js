import Ember from 'ember';
//import httpErrorHandlerMixin from '../mixins/http-error-handler';

export default Ember.Route.extend({
    actions: {
        error: function(error) {
            //this.errorHandler(error);
	    this.httpErrorHandler.errorHandler.call(this, error);
        }
    }
});
