/**
 * Created by tonte on 10/14/15.
 */
'use strict';

angular.module('myApp.email_beneficiary', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/email-beneficiary', {
        templateUrl: 'components/email-beneficiary/email-beneficiary.html'
    });
}])
.controller('BeneficiaryController', ['$scope'/*, 'BeneficiaryService'*/, function ($scope/*, BeneficiaryService*/) {
    $scope.sendEmailBeneficiaryEmailMessages = [];
    $scope.showBeneficiaryEmailSuccessfulMessage = false;
    $scope.format = 'M/d/yyyy';
    $scope.todaysDate = new Date().getTime();

    $scope.navigateTo = function (path) {
        $location.path(path);
    };

    $scope.sendEmail = function () {
        var requestParameters = {
            veteranBeneficiaryInfo: $scope.veteranBeneficiaryInfo,
            veteranInfo: $scope.veteranInfo
        };

        /*BeneficiaryService.sendEmail(requestParameters).then(function (response) {
            $scope.showBeneficiaryEmailSuccessfulMessage = true;
        }, function (error) {
            $scope.sendEmailBeneficiaryEmailMessages.push(error);
            $scope.showBeneficiaryEmailSuccessfulMessage = false;
        });*/
    };
}])
.service('BeneficiaryService', [function(){
    var sendEmail = function(requestParameters) {
        return "success";
    };

    return {
        sendEmail: sendEmail
    };
}])
.directive('veteranBeneficiaryEmail', [function () {
    return {
        restrict: 'E',
        scope: {
            veteranBeneficiaryInfo: '=beneficiaryInfo',
            veteranInfo: '=',
            action: '=',
            pathInfo: '='
        },
        controller: 'BeneficiaryController',
        controllerAs: 'emailBeneficiaryController',
        templateUrl: 'components/email-beneficiary/partials/email-beneficiary-template.html'
    }
}]);