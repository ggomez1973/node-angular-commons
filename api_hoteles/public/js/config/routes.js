'use strict';

angular.module('poc.Routes', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    	.when('/', {
            templateUrl: 'partials/home/home.html',
            controller: 'HotelCtrl'
        })
        .when('/loginForm', {
            templateUrl: 'partials/login/loginForm.html',
            controller: 'LoginCtrl'
        })
        .when('/passwordRecoveryForm', {
            templateUrl: 'partials/login/passwordRecoveryForm.html',
            controller: 'LoginCtrl'
        })
        .when('/passwordChangeForm', {
            templateUrl: 'partials/login/passwordChangeForm.html',
            controller: 'LoginCtrl'
        })
        .when('/hotelForm', {
            templateUrl: 'partials/hotel/hotelForm.html',
            controller: 'HotelCtrl'
        })
        .when('/disponibles', {
            templateUrl: 'partials/hotel/hotelList.html',
            controller: 'HotelCtrl'
        })
        .when('/todos', {
            templateUrl: 'partials/hotel/hotelList.html',
            controller: 'HotelCtrl'
        })

        .otherwise({redirectTo: '/'});
    }
]);
