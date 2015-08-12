import Ember from 'ember';
import ENV from 'errproject/config/environment';

export default Ember.Mixin.create({
  errorHandler: function(error) {
    Ember.debug('Application route error: ' + JSON.stringify(error) + ', error status: ' + error.status);
    
    // Handle Http response code 500 and 503.  Internal error and Service unavailable.
    if ((error && error.status === 500) || (error && error.status === 503)) {
      return this.transitionTo('systemDown');
    }
    
    // Handle Http response code 404.  Not found
    if (error && error.status === 404) {
      return this.transitionTo('pageNotFound'); // Honestly, this could be named pageNotFound instead of error?
    }
    
    // Handle Http response code 401.  Session expired and unauthorized
    if (error && error.status === 401) {
      window.location.href = ENV.baseURL;
      return true;
    }
    
    // Handle HTTP response code 403. Access denied.
    if (error && error.status === 403) {
      return this.transitionTo('accessDenied');
    }

    // Add more error catches as needed if you want to customize the how were handling the situation.
    //   Http response codes: 400 to 417
    //   403.  Forbidden
    //   Http response codes: 500 to 505
    //   501.  Not implemented

    // Finally, this is the worst case senario.  No response at all from server
    return this.transitionTo('systemDown');
  }
});
