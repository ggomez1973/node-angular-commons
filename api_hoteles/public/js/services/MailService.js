services.service('MailService', ['$http', function($http) {
    var service =  {
        sendNewHotelEmail : function(data, callback) {
            var query = 'email='+data.to+'&user='+data.user+'&pass='+data.pass;
            console.log(query);
            $http.get('/mails/invite?'+ query)
            .success(function(result) {
                callback(false, result);
            }) 
            .error(function(error) {
                callback(error);
            });
        }, 
        // @TODO - Implementar bien!
        sendPasswordRecoveryMail : function(email, callback){
            $http.get('/mails/recovery?'+ email)
            .success(function(result) {
                callback(false, result);
            }) 
            .error(function(error) {
                callback(error);
            });
        },
        sendChangedPasswordMail : function(email, callback){
            $http.get('/mails/change?'+ email)
            .success(function(result) {
                callback(false, result);
            }) 
            .error(function(error) {
                callback(error);
            });        
        }   
    };    
    return service;
}]);
