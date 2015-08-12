import Ember from 'ember';
import ComponentEventHandlersMixin from '../../../mixins/component-event-handlers';
import { module, test } from 'qunit';

module('Unit | Mixin | component event handlers');

// Replace this with your real tests.
test('it works', function(assert) {
  var ComponentEventHandlersObject = Ember.Object.extend(ComponentEventHandlersMixin);
  var subject = ComponentEventHandlersObject.create();
  assert.ok(subject);
});
