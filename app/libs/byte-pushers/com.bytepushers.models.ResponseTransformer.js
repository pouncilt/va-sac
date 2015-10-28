/**
 * Represents the application api.  If the variable is already defined use it,
 * otherwise create an empty object.
 *
 * @type {BytePushers|*|BytePushers|*|{}|{}}
 */
var BytePushers = BytePushers || {};
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|BytePushers.models|*|BytePushers.models|Object|*|Object|*}
 */
BytePushers.models = BytePushers.models || BytePushers.namespace("software.bytepushers.models");
/**
 * Represents the application static variable. Use existing static variable, if one already exists,
 * otherwise create a new one.
 *
 * @static
 * @type {*|BytePushers.models.ResponseTransformer|*|BytePushers.models.ResponseTransformer|Object|*|Object|*}
 */
BytePushers.models.ResponseTransformer =  BytePushers.namespace("com.byte-pushers.models.ResponseTransformer");
/**
 * Static method for the ResponseTransformer class that is responsible for transforming the JSON response.
 *
 * @static
 * @method
 * @param {String} jsonResponse  Represents the JSON response of a Restful service call.
 * @param {Transformer} payloadTransformer  Represents the JSON response transformer that is responsible for transforming the JSON Response into the appropriate JavaScript Domain Object Model.
 * @param {Boolean} transformResponseStatus  Optional flag determines if the Transformer should transform the response status.  Response Status are transformed by default.
 * @param {Boolean} transformPayload  Optional flag determines if the Transformer should transform the payload.  Payloads are transformed by default.
 * @returns {BytePushers.models.Response} The response domain model of a service call request.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
BytePushers.models.ResponseTransformer.transformJSONResponse = function (jsonResponse, payloadTransformer, transformResponseStatus, transformPayload) {
    'use strict';
    transformResponseStatus = (Object.isBoolean(transformResponseStatus))? transformResponseStatus: true;
    transformPayload = (Object.isBoolean(transformPayload)) ? transformPayload : true;
        /**
         * Represent the response from a Restful service call.
         *
         * @private
         * @field
         * @type {BytePushers.models.Response}
         */
    var response,
        /**
         * Represent the response status from a Restful service call.
         *
         * @private
         * @field
         * @type {BytePushers.models.ResponseStatus}
         */
        responseStatus,
        /**
         * Represent the response payload from a Restful service call.
         *
         * @private
         * @field
         * @type {Object*}
         */
        responsePayload;

    if (transformPayload && !Object.isDefined(payloadTransformer)) {
        throw new BytePushers.exceptions.InvalidParameterException("payloadTransformer can not be null or undefined.");
    }

    if (transformResponseStatus && !Object.isDefined(jsonResponse)) {
        throw new BytePushers.exceptions.InvalidParameterException("jsonResponse can not be null or undefined.");
    }

    if (transformResponseStatus && !Object.isDefined(jsonResponse.status) ) {
        throw new BytePushers.exceptions.InvalidParameterException("jsonResponse.status can not be null or undefined.");
    }

    if(transformResponseStatus){
        responseStatus = new BytePushers.models.ResponseStatus(jsonResponse.status);
    }

    if(transformPayload) {
        if (Object.isDefined(jsonResponse.payload)) {
            responsePayload = payloadTransformer.transformJSONPayload(jsonResponse.payload);
        } else {
            responsePayload = payloadTransformer.transformJSONPayload(jsonResponse)
        }
    }

    if(!responseStatus){
        responseStatus = new BytePushers.models.ResponseStatus({requestStatus: "Successful", messages: []});
    }

    response = new BytePushers.models.Response(responseStatus, responsePayload);

    return response;
};