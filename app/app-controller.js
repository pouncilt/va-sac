/**
 * Created by tonte on 10/14/15.
 */
myApp.controller('AppController', ['$scope', function($scope) {
    $scope.veteranInfo = {
        primaryEmail: "",
        fullName: "John Doe"
    };
    $scope.beneficiaryInfo = {
        primaryEmail: "lillie.cotton@gmail.com",
        secondaryEmail: "",
        fullName: "Lillie Cotton"
    };
}]);