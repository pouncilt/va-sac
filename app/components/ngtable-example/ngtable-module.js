/**
 * Created by tonte on 10/28/15.
 */
(function() {
    "use strict";

    var app = angular.module("ngtable.example", ["ngRoute", "ngTable"]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/ngtable-example', {
            templateUrl: 'components/ngtable-example/ngtable-example.html'
        });
    }]);


    app.controller("demoController", demoController);

    demoController.$inject = ["NgTableParams", "ngTableSimpleList"];

    function demoController(NgTableParams, simpleList) {
        this.tableParams = new NgTableParams({
            // initial sort order
            sorting: { name: "asc" }
        }, {
            dataset: simpleList
        });
    }


    app.controller("dynamicDemoController", dynamicDemoController);

    dynamicDemoController.$inject = ["NgTableParams", "ngTableSimpleList"];

    function dynamicDemoController(NgTableParams, simpleList) {
        this.cols = [
            { field: "name", title: "Name", sortable: "name", show: true },
            { field: "age", title: "Age", sortable: "age", show: true },
            { field: "money", title: "Money", show: true }
        ];

        this.tableParams = new NgTableParams({
            // initial sort order
            sorting: { age: "desc" }
        }, {
            dataset: simpleList
        });
    }
})();

(function() {
    "use strict";

    angular.module("myApp").run(configureDefaults);
    configureDefaults.$inject = ["ngTableDefaults"];

    function configureDefaults(ngTableDefaults) {
        ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];
    }
})();
