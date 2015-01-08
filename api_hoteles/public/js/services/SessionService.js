
services.service('SessionService', ['$rootScope','$http', function($rootScope, $http) {
    var session =  {
        init: function() {
            this.resetSession();
        },
        resetSession: function() {
            this.currentUser = null;
            this.isLoggedIn = false;
        },
        login : function(user, password, remember, callback) {
            var scope = this;
            $http.post('/login', {username: user, password: password})
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                console.log(error);
                this.currentUser = null;
                callback(error);
            });
        },
        logout: function(callback) {
            var scope = this;
            $http['delete']('/auth')
            .success(function(result) {
                scope.resetSession();
                $rootScope.$emit('session-changed');
                callback(false, result);
            })
            .error(function(error) {
                callback(error);
            });
        },
        authFailed: function() {
            this.resetSession();
        }, 
        authSuccess: function(userData) {
            this.currentUser = userData;
            this.isLoggedIn = true;
            $rootScope.$emit('session-changed');
        },
        recoverPassword: function(user, callback){
            $http.get('/password/'+user)
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                console.log(error);
                callback(error);
            });
        },
        changePassword: function(user, old_p, new_p, callback){
        	var scope = this;
            $http.post('/password/'+user, {password: old_p, new_password: new_p})
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                console.log(error);
                this.currentUser = null;
                callback(error);
            });
        }
    };
    session.init();
    return session;
}]);

