/**
 * Created by tonte on 10/14/15.
 */
vaPersonSearchModule.controller('PersonSearchController', ['$scope', '$location', '$q', '$uibModal', 'NgTableParams', 'PersonSearchService', function ($scope, $location, $q, $uibModal, NgTableParams, PersonSearchService) {
    $scope.errorMessageExist = false;
    $scope.errorMessage = {value: null};
    $scope.personSearchCompleted = false;
    $scope.searchCriteriaInfo = {
        ssn: null,
        firstName: null,
        lastName: null,
        middleName: null,
        dob: null,
        gender: null,
        primaryPhoneNumber: null,
        streetAddress: null,
        city: null,
        state: null,
        zipcode: null
    };
    $scope.selectedPerson = {

    };
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.navigateTo = function (path) {
        $scope.errorMessageExist = false;
        $scope.errorMessage.value = null;
        $location.path(path);
    };

    $scope.reset = function() {
        $scope.searchCriteriaInfo = {
            ssn: null,
            firstName: null,
            lastName: null,
            middleName: null,
            dob: null,
            gender: null,
            primaryPhoneNumber: null,
            streetAddress: null,
            city: null,
            state: null,
            zipcode: null
        };
    };

    $scope.search = function () {
        var requestParameters = {
            searchCriteria: $scope.searchCriteriaInfo,
            unattendedSearch: (Object.isDefined($scope.staffInfo))? true: false
        };

        PersonSearchService.query(requestParameters).then(function (searchResults) {


            if(Object.isArray(searchResults) && searchResults.length > 0) {
                //$scope.personSearchCompleted = true;
                //if(staffInfo){
                    displaySearchResults(searchResults)/*.then(function(selectedPerson) {
                        $scope.selectedPerson = selectedPerson;
                    })*/;
                //}
            } else {
                var msg = "No match found.  Please review the data below to ensure it is correct and complete.<br>";
                    msg += "The person you want to act as a Delegate may not be in VA's records.  If you think this is the case, please have them go to [link] and register.";
                $scope.errorMessageExist = true;
                $scope.errorMessage.value = msg;
            }

        }, function (error) {
            $scope.personSearchCompleted = false;
            $scope.errorMessageExist = true;
            $scope.errorMessage.value = error;
        });
    };

    var displaySearchResults = function (searchResults) {
        //var deferred = $q.defer();

        var modalInstance = $uibModal.open({
            templateUrl: 'components/person-search/partials/person-search-result-template.html',
            controller: 'PersonSearchResultModalController',
            controllerAs: 'personSearchResultModalController',
            size: 'lg',
            resolve: {
                items: function () {
                    return searchResults;
                }
            }
        });

        modalInstance.result.then(function (selectedPerson) {
            //deferred.resolve(selectedPerson);
        }, function(error){
            //deferred.reject(error);
        });

        //return deferred.promise;
    };
}]);