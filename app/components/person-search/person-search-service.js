/**
 * Created by tonte on 10/19/15.
 */
vaPersonSearchModule.service('PersonSearchService', ['$http', '$q', '$resource', 'MessageHandler', function($http, $q, $resource, MessageHandler) {
    var self = this; //This allows the previllage methods to access public and private variables and methods; especially when trying to access within nested functions.
    var selectedPerson;
    this.queryTransformer = function VAResponseDelegateTransformer(jsonResponse, headersGetters, status) {
        var transformPayloadWrapper = true,
            response;

        try {
            BytePushers.models.ResultSetTransformer.setContentTransformer(VA.models.VAPersonTransformer);
            response = BytePushers.models.ResponseTransformer.transformJSONResponse(jsonResponse, BytePushers.models.ResultSetTransformer, false);

            if(transformPayloadWrapper) {
                if(!response.isSuccessful()) {
                    throw new BytePushers.exceptions.WebServiceException(response.getMessage());
                }
            }

            if(!Object.isDefined(response)) {
                throw new BytePushers.exceptions.WebServiceException("No response returned.");
            }

        } catch(exception) {
            exception.originalResponse = jsonResponse;
            throw exception;
        }

        return response;
    };
    var defaultParams = {};
    var actions = {
        query: {
            method: "GET",
            params: {}, //search parameters
            url: "/ams/webapi/VAPersons",
            isArray: false,
            transformResponse: myApp.appendTransform($http.defaults.transformResponse, self.queryTransformer)
        }
    };
    var options = {stripTrailingSlashes: true};
    var resource = $resource("/ams/webapi/VAPersons/:id", defaultParams, actions, options);

    var ensureRouteParametersExist = function(requestParameters) {
        requestParameters.routeParameters = (Object.isDefined(requestParameters.routeParameters))? requestParameters.routeParameters: {};
    };

    var getRouteParameters = function(requestParameters) {
        requestParameters = (!Object.isDefined(requestParameters))? {}: requestParameters;
        ensureRouteParametersExist(requestParameters);
        return requestParameters.routeParameters;
    };

    this.successfulCallBack = function (response) {
        //Perform generic successful handling logic for all requests.
        MessageHandler.addMessages(response.getMessages());
    };

    this.errorCallBack = function (webServiceException) {
        //Perform generic error handling logic for all requests.
        MessageHandler.addMessages(webServiceException.getMessages());
    };

    this.successfulQueryCallBack = function (response) {
        self.successfulCallBack(response);
        // Perform unique successful handling logic here for Query request.
        response.getPayload().forEach(function(vaPerson, index, vaPersonArray) {
            vaPersonArray[index] = vaPerson.toUIObject();
        });

        return response.getPayload();
    };

    this.errorQueryCallBack = function (webServiceException) {
        self.errorCallBack(webServiceException);
        // Perform unique error handling logic here for Query request.
    };

    this.successfulSaveCallBack = function (response) {
        self.successfulCallBack(response);
        // Perform unique successful handling logic here for SAVE request.
    };

    this.errorSaveCallBack = function (webServiceException) {
        self.errorCallBack(webServiceException);
        // Perform unique error handling logic here for SAVE request.
    };

    this.successfulUpdateCallBack = function (response) {
        self.successfulCallBack(response);
        // Perform unique successful handling logic here for UPDATE request.
    };

    this.errorUpdateCallBack = function (webServiceException) {
        self.errorCallBack(webServiceException);
        // Perform unique error handling logic here for UPDATE request.
    };

    this.query = function(requestParameters) {
        var deferred = $q.defer();

        if(!Object.isDefined(requestParameters)) throw new BytePushers.exceptions.NullPointerException("requestParameter is required.");

        resource.query(getRouteParameters(requestParameters)).$promise.then(function(response) {
            // No business logic here because this function is a private function a can not be unit tested.
            // All business logic should go in call back function.
            deferred.resolve(self.successfulQueryCallBack(response));
        }, function(webServiceException) {
            // No business logic here because this function is a private function a can not be unit tested.
            // All business logic should go in call back function.
            self.errorQueryCallBack(webServiceException);
            deferred.reject(webServiceException);
        });

        return deferred.promise;
    };
}]);