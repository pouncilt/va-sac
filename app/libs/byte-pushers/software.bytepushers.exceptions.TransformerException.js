/**
 * Created by tonte on 10/4/15.
 */
/**
 * Created by tonte on 8/10/15.
 */
var BytePushers = BytePushers || {};
BytePushers.exceptions = BytePushers.namespace("software.bytepushers.exceptions");
BytePushers.exceptions.TransformerException = function(transformerExceptionConfig) {
    "use strict";
    var message = (Object.isDefined(transformerExceptionConfig) && Object.isString(transformerExceptionConfig.message))? transformerExceptionConfig.message: null;
    var exceptionMessages = (Object.isDefined(transformerExceptionConfig) && Object.isArray(transformerExceptionConfig.exceptionMessages))? transformerExceptionConfig.exceptionMessages: [];
    var name = "BytePushers.exceptions.TransformerException";

    if (Object.isArray(exceptionMessages) && exceptionMessages.length > 0 && Object.isDefined(message)){
        Error.call(this, message);
    } else if (Object.isArray(exceptionMessages) && exceptionMessages.length > 0){
        Error.call(this, exceptionMessages[0]);
    } else if (Object.isDefined(message)) {
        Error.call(this, message);
    } else {
        Error.call(this);
    }

    BytePushers.exceptions.TransformerException.prototype = new Error();

    this.getName = function() {
        return name;
    };

    this.getMessage = function() {
        return message;
    };

    this.getMessages = function() {
        return exceptionMessages;
    };
};