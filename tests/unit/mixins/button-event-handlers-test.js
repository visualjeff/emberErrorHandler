import Ember from 'ember';
import ButtonEventHandlersMixin from '../../../mixins/button-event-handlers';
import { module, test } from 'qunit';

module('Unit | Mixin | button event handlers');

// Replace this with your real tests.
test('it works', function(assert) {
  var ButtonEventHandlersObject = Ember.Object.extend(ButtonEventHandlersMixin);
  var subject = ButtonEventHandlersObject.create();
  assert.ok(subject);
});
