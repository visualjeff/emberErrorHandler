import Ember from 'ember';

export default Ember.Component.extend({
    tagName: "button",
    //Concatinating properties
    classNames: ["small", "radius"],
    //Concatinating properties
    attributeBindings: ["disabled", "name", "type", "value"],
    type: "submit",
});
