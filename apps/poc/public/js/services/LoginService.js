/*
services.service('LoginService', ['$http', function($http) {
    this.login = function(user, password, callback) {
        $http.post('/login', {username: user, password: password})
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                callback(error);
            });
        return;
    };
    this.logout = function(callback) {
        $http['delete']('/auth')
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                callback(error);
            });
        return;
    };
}]);
*/