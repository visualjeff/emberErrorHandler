import Ember from 'ember';

export function initialize( /* container, application */ ) {
    Ember.$.ajaxSetup({
        headers: {
            'Accept-Language': 'en'
        }, //Set language for all Ajax requests
        cache: false //Required for IE to prevent its aggressive caching of Ajax requests.
    });
}

export default {
    name: 'ajaxconfig',
    initialize: initialize,

    //Properties below influence order of initializers as they are being loaded by ember.
    before: '',
    after: ''
};
