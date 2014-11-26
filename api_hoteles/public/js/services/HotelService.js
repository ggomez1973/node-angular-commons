
services.service('HotelService', ['$http', function($http) {
    return {
        createNewHotel : function(data, callback) {
            $http.post('/users', data)
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                console.log(error);
                callback(error);
            });
        },
        updateHotel : function(data, callback) {
            $http.post('/users/'+data.id, data)
            .success(function(result) {
                callback(false, result);
            })
            .error(function(error) {
                console.log(error);
                callback(error);
            });
        }
    };
}]);