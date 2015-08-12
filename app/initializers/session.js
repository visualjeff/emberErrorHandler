import Ember from 'ember';

/*
 * Dependency injection of a global session object.
 * Access in routes as:  this.session.set(...
 */
export function initialize(container, application) {
    var session = Ember.Object.extend(); // Empty ember object.
    //Register object with application
    application.register('session:main', session);
    
    //Inject dependency into factories as needed...
    //application.inject('adapter', 'session', 'session:main');
    //application.inject('serializer', 'session', 'session:main');
    application.inject('route', 'session', 'session:main');
    //application.inject('controller', 'session', 'session:main');
}

export default {
    name: 'session',
    initialize: initialize,

    //Properties below influence order of initializers as they are being loaded by ember.
    before: '',
    after: ''
};
