'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'gov.va.sac.email.beneficiary.module'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
