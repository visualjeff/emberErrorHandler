import Ember from 'ember';
import HttpErrorHandlerMixin from '../../../mixins/http-error-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | http error handler');

// Replace this with your real tests.
test('it works', function(assert) {
  var HttpErrorHandlerObject = Ember.Object.extend(HttpErrorHandlerMixin);
  var subject = HttpErrorHandlerObject.create();
  assert.ok(subject);
});
