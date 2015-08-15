import Ember from 'ember';

export default Ember.Component.extend({
    //Concatinating properties
    attributeBindings: ["required"],
    didInsertElement: function() {
	//set first element in array to the default choosen value    
	this.set('selected', this.get('choices')[0].choice);
	this.get('model')['selected' + this.get('name')] = this.get('choices')[0].choice;
    },
    change: function(event) {
        this.set('selected', event.target.value);
        this.get('model')['selected' + this.get('name')] = this.get('selected');
    }
});
