import Ember from 'ember';
import httpErrorHandlerMixin from '../mixins/http-error-handler'

export default Ember.Route.extend(httpErrorHandlerMixin, {
    actions: {
        error: function(error) {
            this.errorHandler(error);
        }
    }
});
