import Ember from 'ember';
import ENV from 'errproject/config/environment';

/*
 * Ember httpErrorHandler is a dependecy injected service singleton.
 * Call the error handler like this:
 *
 *   httErrorHandler.errorHandler.call(this, error);
 */
export function initialize(container, application) {
    let httpErrorHandler = Ember.Object.extend({
        errorHandler: function(error) {
            
            //Map response codes or errors to your ember routes for error pages.
            //-----------------------------------------------------------------
    	    let errors = Ember.Map.create()
                .set(400, 'badRequest')
	        .set(401, function() { //unauthorized
                    window.location.href = ENV.baseURL;
                    return true;
                })
                .set(402, 'paymentRequired')
                .set(403, 'forbidden')
                .set(404, 'pageNotFound')
	        .set(405, 'methodNotAllowed')
	        .set(406, 'notAcceptable')
	        .set(407, 'proxyAuthenticationRequired')
	        .set(408, 'requestTimeout')
	        .set(409, 'conflict')
	        .set(410, 'gone')
	        .set(411, 'length')
		.set(412, 'preconditionFailed')
		.set(413, 'requestEntityTooLarge')
		.set(414, 'requestURITooLong')
		.set(415, 'unsupportedMediaType')
		.set(416, 'requestRangeNotSatisfiable')
		.set(417, 'expectationFailed')
                .set(500, 'systemDown')
                .set(501, 'notImplemented')
	        .set(502, 'badGateway')
	        .set(503, 'serviceUnavailable')
	        .set(504, 'gatewayTimeout')  
                .set(505, 'notSupported');
            //-----------------------------------------------------------------
            
            let is = function(obj) {
                return Object.prototype.toString.call(obj).slice(8, -1);
            };

            if (error && typeof error.status !== 'undefined' && errors.has(error.status)) {
                if (is(errors.get(error.status)) === 'String') {
                    return this.transitionTo(errors.get(error.status));
                } else if (is(errors.get(error.status)) === 'Function') {
                    return errors.get(error.status)();
                }
            } else if (error && typeof error.status !== 'undefined' && error && !errors.has(error.status)) {
                return this.transitionTo(errors.get(500));
            } else if (error && typeof error.status === 'undefined') {
                Ember.debug('error object status property is undefined');
            }
        }
    });

    //Register with ember
    application.register('service:httpErrorHandler', httpErrorHandler);
    //Inject in all routes.  Could be injected into other objects
    application.inject('route', 'httpErrorHandler', 'service:httpErrorHandler');
}

export default {
    name: 'http-error-handler',
    initialize: initialize,
    before: '',
    after: ''
};