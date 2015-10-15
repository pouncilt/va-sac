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
 * @param {Boolean} transformPayloadWrapper  Optional flag determines if the Transformer should transform the payload wrapper. Payload wrappers are transformed by default.
 * @param {Boolean} transformPayload  Optional flag determines if the Transformer should transform the payload.  Payloads are transformed by default.
 * @returns {BytePushers.models.Response} The response domain model of a service call request.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
BytePushers.models.ResponseTransformer.transformJSONResponse = function (jsonResponse, payloadTransformer, transformPayloadWrapper, transformPayload) {
    'use strict';
    transformPayloadWrapper = (Object.isBoolean(transformPayloadWrapper))? transformPayloadWrapper : true;
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

    if (transformPayloadWrapper && !Object.isDefined(jsonResponse)) {
        throw new BytePushers.exceptions.InvalidParameterException("jsonResponse can not be null or undefined.");
    }

    if (transformPayloadWrapper && !Object.isDefined(jsonResponse.status) ) {
        throw new BytePushers.exceptions.InvalidParameterException("jsonResponse.status can not be null or undefined.");
    }


    responseStatus = new BytePushers.models.ResponseStatus(jsonResponse.status);
    if (responseStatus.getRequestStatus().toLowerCase() === "Successful".toLowerCase()) {
        if (transformPayload && !Object.isDefined(jsonResponse.payload)) {
            throw new BytePushers.exceptions.InvalidParameterException("jsonResponse.payload can not be null or undefined.");
        }
        responsePayload = (transformPayload)? payloadTransformer.transformJSONPayload(jsonResponse.payload) : null;
    }

    response = (transformPayloadWrapper)? new BytePushers.models.Response(responseStatus, responsePayload): responsePayload;

    return response;
};