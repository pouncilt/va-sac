/**
 * Created by tonte on 10/14/15.
 */
angular.module('myApp.email_beneficiary', [])
.controller('BeneficiaryController', ['$scope', 'BeneficiaryService', function ($scope, BeneficiaryService) {
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

        BeneficiaryService.sendEmail(requestParameters).then(function (response) {
            $scope.showBeneficiaryEmailSuccessfulMessage = true;
        }, function (error) {
            $scope.sendEmailBeneficiaryEmailMessages.push(error);
            $scope.showBeneficiaryEmailSuccessfulMessage = false;
        });
    };
}]);