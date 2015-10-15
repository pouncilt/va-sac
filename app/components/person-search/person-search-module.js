/**
 * Created by tonte on 10/15/15.
 */
'use strict';

var vaPersonSearchModule = angular.module('gov.va.person.search.module', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/email-beneficiary', {
        templateUrl: 'components/email-beneficiary/email-beneficiary.html'
    });
}]);