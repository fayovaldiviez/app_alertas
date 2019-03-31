angular.module('starter.services', [])

/***************************************************************************************
 * FACTORY
 **************************************************************************************/





.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

.factory("Firebase", function() {
     var config = {
    apiKey: "AIzaSyB0n-_HXTAZZfHkK_tzg1w0IxjzguMBUrM",
    authDomain: "pruebas-sistema-alertas.firebaseapp.com",
    databaseURL: "https://pruebas-sistema-alertas.firebaseio.com",
    projectId: "pruebas-sistema-alertas",
    storageBucket: "pruebas-sistema-alertas.appspot.com",
    messagingSenderId: "570104962161"
  };
  return firebase.initializeApp(config);
})

.factory("Push", function($ionicPlatform) {


    
          //LIneas para push notifications
   var tokenprivado = "DEV-2d58e171-bf32-4d2e-94cf-cd9cf0201380-privado";
      var interfaz = {    
              token: "DEV-2d58e171-bf32-4d2e-94cf-cd9cf0201380",
             getToken: function(){
              return tokenprivado;
            }

          }

return interfaz;
  //fin de segmento para push notifications!  
  })

.factory("ionicp", function($ionicPlatform) {
return($ionicPlatform);
 
  })

.factory("StorageService", function($localStorage) {

   $localStorage = $localStorage.$default({
    things: []
  });

  var _getAll = function () {
    return $localStorage.things;
  };

  var _add = function (thing) {
    $localStorage.things.push(thing);
    //$localStorage.things.setItem("dato",thing);
    
  }

  var _remove = function (thing) {
    $localStorage.things.splice($localStorage.things.indexOf(thing), 1);

  }

var _specificData = function(i) {

  return $localStorage.things[i];
}

var _getLength = function(){

  return $localStorage.things.length;
}

var _arrayData = function(nombre,telefono){
 
               var myOby= [
    { nombre: nombre, telefono: telefono }
      ];
 
  //$localStorage.things.push(JSON.stringify(myOby));
  $localStorage.things.push(myOby);
}


var _getArray = function (i){
return $localStorage.things[i];

}

  return {
    getAll: _getAll,
    add: _add,
    remove: _remove,
    iData: _specificData,
    setArray: _arrayData,
    getArray: _getArray,
    getLength: _getLength
  };
  })


.factory("MapService", function($http,$q) {

 

  var _getUbicacion = function (lat,longi) {
      var deferred = $q.defer();
            var promise = deferred.promise;
     
       var key = "AIzaSyA5ZHPGcD8_yZ1K3rrDomB9SiDXt2IXpxU";
       //var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+longi+'&key='+key;

        var url = 'https://maps.googleapis.com/maps/api/geocode/json';
       
            url += "?latlng={0}".replace("{0}", lat)
      
            url += ",{0}".replace("{0}", longi)
   
            url += "&key={0}".replace("{0}", key)
              
            //   var ubicacion = data.results[0].formatted_address; 
              //  console.log("ubicacion desde factory:"+ubicacion);
               
            
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
              console.log(fn);
              return promise;
            }
            promise.error = function(fn) {
                          promise.then(null, fn);
                          return promise;
                  }
            return promise;
 }

  

  return {
    
    getUbicacion: _getUbicacion
  
  };
  })

.factory("StorageGrupal", function($localStorage) {

   $localStorage = $localStorage.$default({
    things: []
  });

  var _getAll = function () {
    return $localStorage.things;
  };

  var _add = function (thing) {
    $localStorage.things.push(thing);
    //$localStorage.things.setItem("dato",thing);
    
  }

  var _remove = function (thing) {
    $localStorage.things.splice($localStorage.things.indexOf(thing), 1);

  }

var _specificData = function(i) {

  return $localStorage.things[i];
}

var _getLength = function(){

  return $localStorage.things.length;
}

var _arrayData = function(nombre,telefono){
 
               var myOby= [
    { nombre: nombre, telefono: telefono }
      ];
 
  //$localStorage.things.push(JSON.stringify(myOby));
  $localStorage.things.push(myOby);
}


var _getArray = function (i){
return $localStorage.things[i];

}

  return {
    getAll: _getAll,
    add: _add,
    remove: _remove,
    iData: _specificData,
    setArray: _arrayData,
    getArray: _getArray,
    getLength: _getLength
  };
  })

.factory('mapaService', function($q,$timeout,$http){

function mapaService($http, $q) {
  var self = this;
  self.get = onGet;
  

    function onGet(lat,lng){
      var deferred = $q.defer();
            var promise = deferred.promise;
                        
            


  var key = "AIzaSyB9jBmY8pNwixFojEoiXDHG__nWGVI6AVw";
       //var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+longi+'&key='+key;

        var url = 'https://maps.googleapis.com/maps/api/geocode/json';
       
            url += "?latlng={0}".replace("{0}", lat)
      
            url += ",{0}".replace("{0}", lng)
   
            url += "&key={0}".replace("{0}", key)


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

});

