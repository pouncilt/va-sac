/**
 * Created by tonte on 10/14/15.
 */
myApp.controller('AppController', ['$scope', function($scope) {
    $scope.veteranInfo = {
        primaryEmail: "john.doe@va.gov",
        fullName: "John Doe"
    };
    $scope.beneficiaryInfo = {
        primaryEmail: "lillie.cotton@gmail.com",
        secondaryEmail: "lillie.cotton@yahoo.com",
        fullName: "Lillie Cotton"
    };
}]);