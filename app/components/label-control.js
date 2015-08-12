import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "label",
  //Concatinating properties
  attributeBindings: ["for"] 
});
