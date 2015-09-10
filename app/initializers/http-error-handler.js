import Ember from 'ember';
import ENV from '../config/environment';

/*
 * Ember httpErrorHandler is a dependecy injected service singleton.
 * Created by visualjeff
 *
 * Have a default error page that takes a model of dataa.
 * If a custom page is available then display it.  Overriding the default model.
 * If no cusotm page exists then display the default error page with default model?
 * The worst possible situation would be to display the error page with the system down message.
 *
 * Call the error handler like this:
 *
 *   httpErrorHandler.errorHandler.call(this, error);
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
                    try {
                      return this.transitionTo(ENV.errorRoute, {responseCode: error.status, errorMessageKey: errors.get(error.status)});
                    } catch(e) {
                      Ember.debug(e.message);
                      return this.transitionTo(ENV.errorRoute, {responseCode: 500, errorMessageKey: 'systemDown'});
                    }
                } else if (is(errors.get(error.status)) === 'Function') {
                    Ember.debug("UNAUTHORIZED - You are being routed back to / to login.  In theory...");
                    return errors.get(error.status)();
                }
            } else if (error && typeof error.status !== 'undefined' && error && !errors.has(error.status)) {
                return this.transitionTo(ENV.errorRoute, {responseCode: 500, errorMessageKey: 'systemDown'});
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
