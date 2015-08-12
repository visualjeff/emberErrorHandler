import Ember from 'ember';

export default Ember.Component.extend({
    isProcessing: false,
    actions: {
        submit: function() {
            this.set('isProcessing', true);
	    var model = this.get('model');
	    //alert(JSON.stringify(model));
            this.sendAction('action', model);
        }
    }
});
