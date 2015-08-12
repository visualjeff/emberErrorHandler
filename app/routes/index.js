import Ember from 'ember';
import ENV from 'errproject/config/environment';
import httpErrorHandlerMixin from '../mixins/http-error-handler'

export default Ember.Route.extend(httpErrorHandlerMixin, {
    model: function() {
        return {
            selectErrorCode: {
                name: 'ErrorCode',
                className: 'dropdown',
                choices: [{
                    choice: '302'
                }, {
                    choice: '401'
                }, {
                    choice: '404'
                }, {
                    choice: '500'
                }]
            },
            selectedErrorCode: "",
            selectHttpCallType: {
                name: 'HttpCallType',
                className: 'dropdown',
                choices: [{
                    choice: 'get'
                }, {
                    choice: 'put'
                }, {
                    choice: 'post'
                }, {
                    choice: 'delete'
                }]
            },
            selectedHttpCallType: ""
        };
    },

    actions: {
        setErrorCode: function(model) {
            var self = this;
            //set active error code and push it to the HTTP mock server.
            //   POST http://localhost:4200/eam/v1/api/forceReturnCode?code=302
            var url = 'http://' + window.location.hostname + ':4200/api/errorCodes/forceErrorCode?code=' + model.selectedErrorCode;
            Ember.$.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: {
                    'Accept': 'application/json'
                }
            }).done(function() {}).fail(function( /*response*/ ) {
                alert('Failed to set errorCode');
            });
        },
        exerciseErrorCode: function() {
            var self = this;
            var model = this.modelFor('index');
            switch (model.selectedHttpCallType) {
                case "get":
                    var url = 'http://' + window.location.hostname + ':4200/api/errorCodes/';
                    Ember.$.ajax({
                        url: url,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        headers: {
                            'Accept': 'application/json'
                        },
                        success: function(data) {
                            //self.resolve(data);
                        },
                        error: function(request, textStatus, error) {
                            self.errorHandler(request);
                        }
                    });
                    break;
                case "post":
                    break;
                case "put":
                    break;
                case "delete":
                    break;
            }
        }
    }
});
