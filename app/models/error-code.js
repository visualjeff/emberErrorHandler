import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    //error: DS.attr('string'),

    didLoad: function() {
        Ember.debug('model didLoad');
    },
    becameInvalid: function() {
        Ember.debug('model became Invalid');
    }

});
