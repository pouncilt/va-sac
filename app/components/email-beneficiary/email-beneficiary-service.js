/**
 * Created by tonte on 10/14/15.
 */
angular.module('myApp.email_beneficiary', []).service('BeneficiaryService', [function(){
    var sendEmail = function(requestParameters) {
        return "success";
    };

    return {
        sendEmail: sendEmail
    };
}]);