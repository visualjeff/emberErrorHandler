import Ember from 'ember';
import FormEventHandlersMixin from '../../../mixins/form-event-handlers';
import { module, test } from 'qunit';

module('Unit | Mixin | form event handlers');

// Replace this with your real tests.
test('it works', function(assert) {
  var FormEventHandlersObject = Ember.Object.extend(FormEventHandlersMixin);
  var subject = FormEventHandlersObject.create();
  assert.ok(subject);
});
