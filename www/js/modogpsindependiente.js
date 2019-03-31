   $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) { 
                      

                             $ionicLoading.show({
                                content: 'Cargando Ubicacion',
                             animation: 'fade-in',
                             showBackdrop: true,
                              maxWidth: 200,
                             showDelay: 0
  });
                            var lat = position.coords.latitude;
                           // $localStorage.latitudeL = lat;
                            var longi = position.coords.longitude;
                           
                          
                            MapService.getUbicacion(lat,longi).then(function(dataUbi){
                                var miubicacion = "" ;
                                //sleep(2000);
                                miubicacion = dataUbi.results[0].formatted_address;
                     

                            }).error(function(data){
                $ionicLoading.hide();
          
                var alertPopup = $ionicPopup.alert({
                        title: 'Error al cargar ubicacion',
                        template: 'Verifique el sensor gps'
                    });
            });
  
                        },
                        function(err) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Si deseas que tu ubiación sea proporcionada, habilita gps'
                            });

                    
                        });