import Ember from 'ember';

export default Ember.Component.extend({
    //Concatinating properties
    attributeBindings: ["required"],
    change: function(event) {
        this.set('selected', event.target.value);
        this.get('model')['selected' + this.get('name')] = this.get('selected');
	alert('selected' + this.get('name') + " = "  + this.get('model')['selected' + this.get('name')]);
    }
});
