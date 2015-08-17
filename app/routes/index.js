import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return {
            selectErrorCode: {
                name: 'ErrorCode',
                className: 'dropdown',
                choices: [{ choice: '400', description: 'Bad Request'}, 
                          { choice: '401', description: 'Unauthorized'}, 
                          { choice: '402', description: 'Payment Required'}, 
                          { choice: '403', description: 'Forbidden'}, 
                          { choice: '404', description: 'Not Found'}, 
                          { choice: '405', description: 'Method Not Allowed'}, 
                          { choice: '406', description: 'Not Acceptable'}, 
                          { choice: '407', description: 'Proxy Authentication Required'}, 
                          { choice: '408', description: 'Request Timeout'}, 
                          { choice: '409', description: 'Conflict'}, 
                          { choice: '410', description: 'Gone'}, 
                          { choice: '411', description: 'Length Required'}, 
                          { choice: '412', description: 'Precondition Failed'}, 
                          { choice: '413', description: 'Request Entity Too Large'}, 
                          { choice: '414', description: 'Request-URI Too Long'}, 
                          { choice: '415', description: 'Unsupported Media Type'}, 
                          { choice: '416', description: 'Requested Range Not Satisfiable'}, 
                          { choice: '417', description: 'Expectation Failed'},
                          { choice: '500', description: 'Internal Server Error'}, 
                          { choice: '501', description: 'Not Implemented'}, 
                          { choice: '502', description: 'Bad Gateway'}, 
                          { choice: '503', description: 'Service Unavailable'}, 
                          { choice: '504', description: 'Gateway Timeout'}, 
                          { choice: '505', description: 'Http Version Not Supported'} 
                         ]
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
            alert("Requesting " + model.selectedErrorCode + " HTTP response code using an HTTP " + model.selectedHttpCallType + " request.");
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
                alert('Failed to set HTTP return code');
            });
        },
        exerciseErrorCode: function() {
            var self = this;
	    var model = this.modelFor('index');
	    var url = 'http://' + window.location.hostname + ':4200/api/errorCodes/';
	    switch (model.selectedHttpCallType) {
                case "get":
                    Ember.$.ajax({
                        url: url,
                        type: 'GET',
			data: {},
                        success: function( /* data */) {
                            //Ember.debug("Success callback invoked");
			    //self.resolve(data);
                        },
                        error: function(request /* , textStatus, error */) {
		            //Ember.debug("Error callback invoked");
                            self.httpErrorHandler.errorHandler.call(self, request);
                        }
                    });
                    break;
                case "post":
                    Ember.$.ajax({
                        url: url,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        headers: {
                            'Accept': 'application/json'
                        },
                        success: function( /* data */) {
                            //Ember.debug("Success callback invoked");
			    //self.resolve(data);
                        },
                        error: function(request /* , textStatus, error */) {
		            //Ember.debug("Error callback invoked");
                            self.httpErrorHandler.errorHandler.call(self, request);
                        }
                    });
                    break;
		case "put":
                    Ember.$.ajax({
                        url: url,
                        type: 'PUT',
                        data: {},
			success: function( /* data */) {
                            //Ember.debug("Success callback invoked");
			    //self.resolve(data);
                        },
                        error: function(request /* , textStatus, error */) {
		            //Ember.debug("Error callback invoked");
                            self.httpErrorHandler.errorHandler.call(self, request);
                        }
                    });
		    break;
                case "delete":
                    Ember.$.ajax({
                        url: url,
                        type: 'DELETE',
                        success: function( /* data */) {
                            //Ember.debug("Success callback invoked");
			    //self.resolve(data);
                        },
                        error: function(request /* , textStatus, error */) {
		            //Ember.debug("Error callback invoked");
                            self.httpErrorHandler.errorHandler.call(self, request);
                        }
                    });
		    break;
            }
        }
    }
});
