/**
 * Created by tonte on 10/14/15.
 */
vaEmailModule.service('BeneficiaryService', ['$q', '$resource', function($q, $resource){
    var sendEmail = function(requestParameters) {
        var deferred = $q.deferred();

        deferred.resolve("Successful");

        return deferred.promise();
    };

    return {
        sendEmail: sendEmail
    }
}]);