services.service('MailService', ['$http', function($http) {
    var service =  {
        sendNewHotelEmail : function(data, callback) {
            var query = 'email='+data.to+'&user='+data.user+'&pass='+data.pass;
            $http.get('/mails/invite?'+ query)
            .success(function(result) {
                callback(false, result);
            }) 
            .error(function(error) {
                callback(error);
            });
        }, 
        sendPasswordRecoveryMail : function(data, callback){
        	var query = 'email='+data.to+'&pass='+data.pass;
            $http.get('/mails/recovery?'+ query)
            .success(function(result) {
                callback(false, result);
            }) 
            .error(function(error) {
                callback(error);
            });
        },
        // @TODO - Implementar bien!
        /* Hace falta?
        sendChangedPasswordMail : function(data, callback){
            $http.get('/mails/change?'+ email)
            .success(function(result) {
                callback(false, result);
            }) 
            .error(function(error) {
                callback(error);
            });        
        } */
    };    
    return service;
}]);
