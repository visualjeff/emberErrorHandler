import Ember from 'ember';
import SelectEventHandlersMixin from '../../../mixins/select-event-handlers';
import { module, test } from 'qunit';

module('Unit | Mixin | select event handlers');

// Replace this with your real tests.
test('it works', function(assert) {
  var SelectEventHandlersObject = Ember.Object.extend(SelectEventHandlersMixin);
  var subject = SelectEventHandlersObject.create();
  assert.ok(subject);
});
