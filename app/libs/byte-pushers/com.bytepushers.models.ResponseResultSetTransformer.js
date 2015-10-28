/**
 * Created by tonte on 10/4/15.
 */
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
 * @type {*|BytePushers.models.ResultSetTransformer|*|BytePushers.models.ResultSetTransformer|Object|*|Object|*}
 */
BytePushers.models.ResultSetTransformer =  BytePushers.namespace("software.bytepushers.models.ResponseResultSetTransformer");
BytePushers.models.ResultSetTransformer.setContentTransformer = function(contentTransformer) {
    this.contentTransformer = contentTransformer;
};
/**
 * Static method for the ResultSetTransformer class that is responsible for transforming the JSON response.
 *
 * @static
 * @method
 * @param {String} resultSetJsonConfig  Represents the JSON response of a Restful service call.
 * @returns {User} The response domain model of a service call request.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
BytePushers.models.ResultSetTransformer.transformJSONPayload = function (resultSetJsonConfig) {
    'use strict';

    /**
     * Represent an existing User.
     *
     * @private
     * @field
     * @type {User}
     */
    var someResultSet = [],
        transformerExceptionMsg;

    if (!Object.isArray(resultSetJsonConfig)) {
        transformerExceptionMsg = "resultSetJsonConfig can not be null or undefined.";
        throw new BytePushers.exceptions.TransformerException({message: transformerExceptionMsg});
    }

    if (!Object.isDefined(this.contentTransformer)) {
        transformerExceptionMsg = "contentTransformer can not be null or undefined.";
        throw new BytePushers.exceptions.TransformerException({message: transformerExceptionMsg});
    }

    try{
        resultSetJsonConfig.forEach(function(resultJsonConfig, resultSetIndex, resultSet) {
            someResultSet.push(BytePushers.models.ResultSetTransformer.contentTransformer.transformJSONPayload(resultJsonConfig))
        });
    } catch(exception) {
        transformerExceptionMsg = exception.message;
        throw new BytePushers.exceptions.TransformerException({message: transformerExceptionMsg});
    }

    return someResultSet;
};