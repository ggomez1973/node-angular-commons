
services.service('SessionService', ['$http', function($http) {
    var currentUser;
    return {
        login : function(user, password, remember, callback) {
            $http.post('/login', {username: user, password: password})
            .success(function(result) {
                currentUser = result; 
                callback(false, result);
            })
            .error(function(error) {
                currentUser = null;
                callback(error);
            });
        },
        logout: function(callback) {
            $http['delete']('/auth')
            .success(function(result) {
                currentUser = null;
                callback(false, result);
            })
            .error(function(error) {
                callback(error);
            });
        },
        getAuthenticatedUser: function() {
            return currentUser;
        },
        setAuthenticatedUser : function (userData) {
            currentUser=userData;
        },
        isUserLoggedIn: function(){
            return currentUser!=null;
        }
    };
}]);

