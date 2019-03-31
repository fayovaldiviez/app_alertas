angular.module('mensaje.Services')

.service('mapaService', mapaService);

mapaService.$inject = ['$http', '$q', 'constants']

function mapaService($http, $q,constants) {
	var self = this;
	self.get = onGet;
  

    function onGet(lat,lng,key){
    	var deferred = $q.defer();
            var promise = deferred.promise;
                        
            var url= constants.ubicacion.get(lat,lng,key);
            //var config = header("Access-Control-Allow-Origin: *");
            $http.get(url).success(function(data){
              
              if(data){  
                deferred.resolve(data);
            } 
              else {
                deferred.reject(data);
            }
            }).error(function(data) {
                deferred.reject(data);
            });
            promise.success = function(fn) {
              promise.then(fn);
              return promise;
            }
            promise.error = function(fn) {
                          promise.then(null, fn);
                          return promise;
                  }
            return promise;
      }
  
}