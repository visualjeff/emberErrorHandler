# emberErrorHandler
##An example of how to use an Initializer to handle http response / error codes.  

###The file app/initializer/http-error-handler.js does all of the work. 

#####Example usage:

```javascript
                    Ember.$.ajax({
                        url: url,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        headers: {
                            'Accept': 'application/json'
                        },
                        success: function(data) {
                            self.resolve(data);
                        },
                        error: function(request /* , textStatus, error */) {
                            self.httpErrorHandler.errorHandler.call(self, request);
                        }
                    });
```
=======
