
services.service('SessionService', ['$http', function($http) {
    var session = {
        init: function () {
            this.resetSession();
        },
        resetSession: function() {
            this.currentUser = null;
        },
        logout: function() {
            $http['delete']('/auth').success(function() {
                this.resetSession();
                //$rootScope.$emit('session-changed');
            });
        },
        authSuccess: function(userData) {
            console.log(userData);
            //var x = JSON.parse(JSON.stringify(userData)); 
            this.currentUser = userData; 
            //$rootScope.$emit('session-changed');
        },
        authFailed: function() {
            this.resetSession();
            $location.path('/');
        },
        getAuthenticatedUser: function() {
            return this.currentUser;
        },
        isUserLoggedIn: function(){
            return this.currentUser!=null;
        }
    };
    session.init();
    return session;
}]);
