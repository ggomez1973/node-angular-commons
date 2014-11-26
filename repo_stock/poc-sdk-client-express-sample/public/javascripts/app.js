var poc = window.poc = angular.module('poc', [
       'ngRoute',
       'poc.Controllers',
       'poc.Routes',
       'poc.Services',
       'poc.Directives'
       ])
       .run(['$rootScope', '$window', '$location',
             function ($rootScope, $window, $location) {
             // Do nothing!    	   
}]);
