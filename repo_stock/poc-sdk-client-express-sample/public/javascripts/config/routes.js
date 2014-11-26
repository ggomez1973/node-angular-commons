'use strict';

angular.module('poc.Routes', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/itemsMaster', {
            templateUrl: 'partials/itemsMaster.html',
            controller: 'ItemsMasterCtrl'
        })
        .when('/itemForm', {
            templateUrl: 'partials/itemForm.html',
            controller: 'ItemFormCtrl'
        })
        .when('/itemsSearch', {
            templateUrl: 'partials/itemsSearch.html',
            controller: 'ItemsSearchCtrl'
        })
        .when('/itemsCount', {
            templateUrl: 'partials/itemsCount.html',
            controller: 'ItemsCountCtrl'
        })
        .when('/itemDetail/:id', {
            templateUrl: 'partials/itemDetail.html',
            controller: 'ItemDetailCtrl'
        })
        .otherwise({redirectTo: '/'});
    }
]);
