/**
 * Created by tonte on 10/25/15.
 */
vaPersonSearchModule.controller('PersonSearchResultModalController', ['$scope', 'NgTableParams', '$uibModalInstance', 'items', function ($scope, NgTableParams, $uibModalInstance, items) {
    var self = this;
    self.cols = [
        /*{ field: "select", title: "Select", show: true },*/
        { field: "lastName", title: "Last Name", sortable: "lastName", show: true }/*,
        { field: "firstName", title: "First Name", sortable: "firstName", show: true },
        { field: "middleName", title: "Middle Name", sortable: "middleName", show: true },
        { field: "dob", title: "Date of Birth", sortable: "dob", show: true },
        { field: "gender", title: "Gender", sortable: "gender", show: true },
        { field: "ssn", title: "SSN", sortable: "ssn", show: true },
        { field: "city", title: "City", sortable: "city", show: true },
        { field: "state", title: "State", sortable: "state", show: true }*/
    ];

    var initialParams = {
        count: 5,   // initial page size
        page: 1     // show first page
    };

    var initialSettings = {
        // page size buttons (right set of buttons in demo)
        // counts: [],
        // determines the pager buttons (left set of buttons in demo)
        // paginationMaxBlocks: 13,
        // paginationMinBlocks: 2,
        total: items.length,
        dataset: items,
        getData: function ($defer, params) {
            // use built-in angular filter
            /*var filteredData = params.filter() ?
                $filter('filter')(data, params.filter()) :
                data;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                data;*/
            params.total(items.length); // set total for recalc pagination
            $defer.resolve(items);
        }
    };

    $scope.tableParams = new NgTableParams(initialParams, initialSettings);
    $scope.dataset = items;
    $scope.items = items;
    $scope.submit = function (selectedPerson) {
        $uibModalInstance.close(selectedPerson);
    };

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);