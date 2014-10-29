var poc = window.poc = angular.module('poc', [
   'ngRoute',
   'poc.Controllers',
   'poc.Routes',
   'poc.Services',
   'poc.Directives'
   ])
   .run(['$rootScope', '$window', '$location', 'SessionService', function ($rootScope, $window, $location, ss) {
        $rootScope.session = ss; // ????
        $window.app = {
            authState: function(state, user) {
                $rootScope.$apply(function() {
                    switch (state) {
                        case 'success':
                            ss.authSuccess(user);
                            break;
                        case 'failure':
                            ss.authFailed();
                            break;
                    }                    
                });
            }
        };
        if ($window.user !== null) {
        	ss.authSuccess($window.user);
        }    	   
}]);
