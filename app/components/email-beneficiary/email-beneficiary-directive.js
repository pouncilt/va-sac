angular.module('gov.va.sac.directives.email_beneficiary', [])
    /*.controller('BeneficiaryController', ['$scope', '$rootScope', /!*'BeneficiaryService', *!/function($scope, $rootScope/!*, BeneficiaryService*!/) {
        $scope.sendEmailBeneficiaryEmailMessages = [];
        $scope.showBeneficiaryEmailSuccessfulMessage = false;
        $scope.todaysDate = new Date().getTime();
    }])*/
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