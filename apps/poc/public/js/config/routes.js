'use strict';

angular.module('poc.Routes', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    	.when('/', {
            templateUrl: 'partials/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/loginForm', {
            templateUrl: 'partials/login/loginForm.html',
            controller: 'LoginCtrl'
        })
        .when('/signUpForm', {
            templateUrl: 'partials/login/signUpForm.html',
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
        .otherwise({redirectTo: '/'});
    }
]);
