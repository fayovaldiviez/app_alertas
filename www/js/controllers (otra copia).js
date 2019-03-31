/**********************************
 * [MODULE] PLAIN TEXT
 *********************************/

var app = angular.module('starter.controllers', ["firebase", "ionic", "base64", "angular-svg-round-progressbar"]).
filter('plainText', function() {
    return function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});

app.value('usersOnline', 15);


/**********************************
 * [CONTROLLER] WELCOME
 *********************************/
app.controller('WelcomeCtrl', function(Firebase, Auth, ionicp, $scope, $stateParams, $ionicModal, $location, $http, $localStorage, $state, $ionicHistory, $ionicPopup, $cordovaGeolocation, $timeout,$rootScope,$ionicSideMenuDelegate,$ionicLoading,$ionicPlatform) {
$ionicSideMenuDelegate.canDragContent(false);
    //$scope.email = $localStorage.email;

     

    function isLogin() {
        if ($localStorage.email != undefined) {
            //alert("Se encuentra un usuario logueado");
            //$ionicHistory.nextViewOptions({disableBack: true, historyRoot: true });
            //$location.path('/sms');
            //$state.go('menu.miPerfil');
            //$state.go('menu.sms');
            /*
             $ionicHistory.clearCache().then(function() {
    //now you can clear history or goto another state if you need
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
    $state.go('menu.sms');
})
*/
                            $ionicLoading.show({
                            content: 'Cargando Datos',
                             animation: 'fade-in',
                             showBackdrop: true,
                              maxWidth: 200,
                             showDelay: 0
                             
  });
            $scope.email = $localStorage.email;
            $rootScope.emailRaiz = $localStorage.email;

            window.setTimeout(function() {
                // alert("yedo a menu.sms");
                //$ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({ disableBack: true });
                $ionicLoading.hide();
                $state.go('menu.sms');

            }, 10);


        } else {
            //alert("debes iniciar sesion");
        }
    }

    //fin de funcion

    $scope.recoverKey = function(email) {

        var link = 'http://blognaucalpan.com.mx/sistema/appapis/KeyRecover.php';
        $http.post(link, { email: email }).then(function(res) {
            $scope.respuestaRecover = res.data;
            //console.log($scope.response)
        });
    }


    ///instanciar modal a passRecover.html y crear funcion para abrir y cerrar
    $ionicModal.fromTemplateUrl('templates/modales/passRecover.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modalrecover) {
        $scope.modalRecover = modalrecover;
    });

    // Open the modal
    $scope.openRecover = function() {

        $scope.modalRecover.show();
    };

    // Close the modal
    $scope.closeRecover = function() {

        $scope.modalRecover.hide();
    };




    /*
        function showTutorial() {
            $ionicModal.fromTemplateUrl('templates/modales/tutorial.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(tutorial) {
                tutorial.show();
                $scope.modalTutorial = tutorial;

            });

        }

     segemento para habilitar tutorial la primera vez que se abre la app
        if ($localStorage.firsTime == undefined) {
            showTutorial();
            $localStorage.firsTime = false;
        } 

        $scope.closeTutorial = function() {

            $scope.modalTutorial.hide();
        }; */



    ///instanciar modal a privacidad.html y crear funcion para abrir y cerrar
    $ionicModal.fromTemplateUrl('templates/modales/politicas.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modalpoliticas) {
        $scope.modalPoliticas = modalpoliticas;
    });

    // Open the modal
    $scope.openPoliticas = function() {

        $scope.modalPoliticas.show();
    };

    // Close the modal
    $scope.closePoliticas = function() {

        $scope.modalPoliticas.hide();
    };




    ///instanciar modal a terminos.html y crear funcion para abrir y cerrar
    $ionicModal.fromTemplateUrl('templates/modales/terminos.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modalterminos) {
        $scope.modalTerminos = modalterminos;
    });

    // Open the modal
    $scope.openTerminos = function() {

        $scope.modalTerminos.show();
    };

    // Close the modal
    $scope.closeTerminos = function() {

        $scope.modalTerminos.hide();
    };




    $scope.error = null;
    $scope.register = false;

    /**********************************
     * [FUNCTIONS] UTILS
     *********************************/

    $scope.isIncorrectValue = function(val) {
        return angular.isUndefined(val) || val === null || val == "";
    }

    $scope.cleanVariables = function() {
        $scope.error = null;
    }

    /**********************************
     * [FIREBASE]
     *********************************/

    $scope.createUser = function(form) {
        if ($scope.isIncorrectValue(form.email) || $scope.isIncorrectValue(form.password)) {
            $scope.error = "Datos incorrectos!";
        } else {
            // Create the user on Auth instance
            Auth.$createUserWithEmailAndPassword(form.email, form.password)
                .then(function() {
                    $scope.register = true;
                    // If this is a success, log in
                    return Auth.$signInWithEmailAndPassword(form.email, form.password)
                }).catch(function(error) {
                    // If we have an error, catch and print it
                    $scope.error = "" + error;
                });
        }
    };


    $scope.loginUser = function(user) {
        if ($scope.isIncorrectValue(user.email) || $scope.isIncorrectValue(user.password)) {
            $scope.error = "Error en datos!";
            //  $localStorage.email = authData.email;
        } else {



            Auth.$signInWithEmailAndPassword(user.email, user.password)
                .then(function(authData) {
                    $localStorage.email = authData.email;

                    $scope.loggedInUser = authData;
                    $scope.email = $localStorage.email;
                     $rootScope.emailRaiz = $localStorage.email;

                    $ionicHistory.nextViewOptions({ disableBack: true });

                    //$state.go('menu.miPerfil');
                    $state.go('menu.sms');

                    //      $ionicHistory.clearCache().then(function() {
                    //now you can clear history or goto another state if you need
                    //$ionicHistory.clearHistory();
                    //$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                    //$state.go('menu.sms');
                    //})


                    var push = new Ionic.Push({
                        "debug": true
                    });


                    push.register(function(token) {
                        console.log("My Device token:", token.token);
                        push.saveToken(token); // persist the token in the Ionic Platform
                        var link = 'http://blognaucalpan.com.mx/sistema/appapis/apinotificacionesupdate.php';
                        $http.post(link, { email: $scope.email, token: token.token }).then(function(res) {
                            $scope.response = res.data;
                            console.log($scope.response)
                        });
                    });





                }).catch(function(error) {
                    // $scope.error = ""+error;
                    //console.log(error+"esta es la linea");
                    $scope.error = " ¡Error al iniciar sesión, verifique sus datos!"
                });
        }
    }



    // Configuration (File, animation, function)
    $ionicModal.fromTemplateUrl('templates/icons/tab-icons.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalRegister = modal;
    });

    // Open the modal
    $scope.openRegister = function() {
        $scope.cleanVariables();
        $scope.modalRegister.show();
    };

    // Close the modal
    $scope.closeRegister = function() {
        $scope.cleanVariables();
        $scope.modalRegister.hide();
    };


    isLogin();
});


/**********************************
 * [CONTROLLER] CAMERA
 *********************************/
app.controller('PhotoCtrl', function($scope) {


});

/**********************************
 * [CONTROLLER] SEARCH
 *********************************/
app.controller('SearchCtrl', function(Firebase, Auth, $scope, $location, $sce, ionicp, $http, $cordovaGeolocation) {
    // $scope.infos = "informacion desde controller";
    /*

        Auth.$onAuthStateChanged(function(authData) {


            if (!authData) {
                console.log("Signed out");
               // $scope.loggedInUser = null;
                $ionicViewService.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });


            } else {

                var posOptions = { timeout: 20000, enableHighAccuracy: true };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) {
                        var lat = position.coords.latitude
                        var longi = position.coords.longitude
                        console.log(lat + " --- " + longi);

                        console.log(" estas logueado");
                        console.log(authData.email);

                        var mail = authData.email;
                        //var link = "http://blognaucalpan.com.mx/sistema/appapis/apialertas.php?dato=";
                        var link = "http://blognaucalpan.com.mx/sistema/appapis/apialertas.php?dato=";
                        var linkmail = link.concat(mail);
                        var linkmailubicacion = linkmail + '&longitud=' + longi + '&latitud=' + lat;
                        console.log(linkmailubicacion);
                        //$scope.infos="http://www.developer.dim3nsoft.com/subir/index.php";
                        $scope.infos = authData.email;
                        $scope.url = $sce.trustAsResourceUrl(linkmail);



                    }, function(err) {
                        // error
                    });





            }
        });
    */

});


app.controller('iconsCtrl', function($scope) {

});




app.controller('tabController', function($scope, $cordovaInAppBrowser, $ionicPlatform) {


    $scope.openApp = function() {

        var sApp = startApp.set({ /* params */
            "action": "ACTION_MAIN",
            "package": "com.mensaje.mensaje",
            "intentstart": "startActivity"
        }, { /* extras */

        });


        sApp.check(function(values) { /* success */
            // alert("twitter disponible :D");
            console.log(values)
        }, function(error) { /* fail */
            alert(error);
        });

        sApp.start(function() { /* success */
            // alert("abriendo twitter desde startapp");
            console.log(values)
        }, function(error) { /* fail */
            alert(error);
        });




    };

});





/**********************************
 * [CONTROLLER] ACCOUNT
 *********************************/
app.controller('AccountCtrl', function(Firebase, Auth, ionicp, $scope, $location, $http, $localStorage, $state, $ionicHistory,$rootScope) {

    /**********************************
     * [FIREBASE]
     *********************************/

    $scope.registrarContactos = function() {

        $state.go('menu.contactos');


    }

   // $scope.email = $localStorage.email;


    $scope.logout = function() {
        ///quitar registro del token///


        //$localStorage.nombre = "";

        //$scope.email = authData.email;


        var link = 'http://blognaucalpan.com.mx/sistema/appapis/apinotificacionesnull.php';
        $http.post(link, { email: $localStorage.email }).then(function(res) {
            console.log("SENDING POST NULL TOKEN");
            console.log("email desde storage : " + $localStorage.email);
            $scope.response = res.data;
            console.log("Email desde storage actualizado: " + $localStorage.email);
            console.log($scope.response);
            $localStorage.email = undefined;
            $localStorage.nombre = undefined;
            // alert("respuesta de esrvidor " + res.data);

                    $scope.loggedInUser = null;
                     $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({disableBack: true, historyRoot: true });
        $location.path('/welcome');
        Auth.$signOut();

        });

        //  $localStorage.email = "";
        // $localStorage.clear();
        //$localStorage.nombre = undefined;
        // alert("email " + $localStorage.email);
        //alert("nombre" + $localStorage.nombre);


    }


});

/**********************************
 * [CONTROLLER] SLIDE
 *********************************/
app.controller('SlideCtrl', function($scope) {

});

app.controller('AppCtrl', function($scope, $http, Push, $localStorage, $ionicPopup,$state,$location,$timeout,$ionicModal) {


    $scope.btnRegistro = true;

    $scope.data = {};

    $scope.submit = function() {
        $localStorage.nombre = $scope.data.nombre;

        //  alert($scope.data.polpriv);

        console.log("Enviando datos");
        var link = 'http://blognaucalpan.com.mx/sistema/appapis/apiregistros.php';
        $http.post(link, { email: $scope.data.email, password: $scope.data.password, nombre: $scope.data.nombre, apellido: $scope.data.apellido, telefono: $scope.data.telefono }).then(function(res) {
            $scope.response = res.data;
            console.log($scope.response);
            $scope.btnRegistro = false;
            var alertPopup = $ionicPopup.alert({
                title: 'Notificacion',
                template: 'Su usuario ya está activo.',
                  buttons: [{
                text: 'Aceptar',
                type: 'button-positive',
                onTap: function() {
            //    	alert("jala");
$scope.modalRegister.hide();
      

                }
            }]
            });
        });
    };




});

app.controller('SendAlert', function(Firebase, Auth, $scope, $http) {
    console.log("dato para enviar por post  :", authData.email);
    $scope.data = {};

    $scope.submit = function() {

        console.log("Enviando datos");
        $http.post(link, { email: $scope.data.email }).then(function(res) {
            $scope.response = res.data;
            console.log($scope.response)
        });
    };
});


app.controller('controllerDenuncia', function(Firebase, Auth, $scope, $location, $timeout ,$sce, ionicp, $http, $cordovaGeolocation, $state, $ionicPopup,$cordovaCapture, $cordovaCamera, $cordovaFile, $base64, $cordovaFileTransfer, $localStorage, $ionicLoading) {
    // $scope.infos = "informacion desde controller";




       function checkAvailability() {
            cordova.plugins.diagnostic.isGpsLocationAvailable(function(available) {
                console.log("GPS location is " + (available ? "available" : "not available"));
                if (!available) {
                    checkAuthorization();
                } else {
                    console.log("GPS location is ready to use");
                }
            }, function(error) {
                console.error("The following error occurred: " + error);
            });
        }

        function checkAuthorization() {
            cordova.plugins.diagnostic.isLocationAuthorized(function(authorized) {
                console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
                if (authorized) {
                    checkDeviceSetting();
                } else {
                    cordova.plugins.diagnostic.requestLocationAuthorization(function(status) {
                        switch (status) {
                            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                                console.log("Permission granted");
                                checkDeviceSetting();
                                break;
                            case cordova.plugins.diagnostic.permissionStatus.DENIED:
                                console.log("Permission denied");
                                // User denied permission
                                break;
                            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                                console.log("Permission permanently denied");
                                // User denied permission permanently
                                break;
                        }
                    }, function(error) {
                        console.error(error);
                    });
                }
            }, function(error) {
                console.error("The following error occurred: " + error);
            });
        }

        function checkDeviceSetting() {
            cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled) {
                console.log("GPS location setting is " + (enabled ? "enabled" : "disabled"));
                if (!enabled) {
                    cordova.plugins.locationAccuracy.request(function(success) {
                        console.log("Successfully requested high accuracy location mode: " + success.message);
                    }, function onRequestFailure(error) {
                        console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
                        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                            if (confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                cordova.plugins.diagnostic.switchToLocationSettings();
                            }
                        }
                    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
                }
            }, function(error) {
                console.error("The following error occurred: " + error);
            });
        }

        checkAvailability(); // start the check




    $scope.showButtons = false;
    $scope.openMapas = function() {
        $state.go('menu.mapabaches');
    }

$scope.deleteFoto = function (){
	//alert($scope.foto);
	  var link = 'http://blognaucalpan.com.mx/sistema/appapis/deletef.php';
        $http.post(link, { ruta : $scope.foto }).then(function(res) {
            //$scope.response = res.data;
             
          //  alert(res.data);
            $scope.showButtons = false;
        });
}

$scope.sendReport = function(){


                             $ionicLoading.show({
                                content: 'Cargando Ubicacion',
                             animation: 'fade-in',
                             showBackdrop: true,
                              maxWidth: 200,
                             showDelay: 0
                             
  });

var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

   $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) { 
                      

                            var lat = position.coords.latitude;
                           // $localStorage.latitudeL = lat;
                            var longi = position.coords.longitude;
                                                     
                            var link = 'http://blognaucalpan.com.mx/sistema/appapis/resp.php';
        $http.post(link, { tipoalerta:"Bomberos", email : $localStorage.email, imagen: $scope.urlFoto, comment: $scope.comentarios, latitud: lat,longitud: longi }).then(function(respuesta) {

            //$scope.response = res.data;
           $ionicLoading.hide();
     $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3500);

        var templateImg = '<img src="img/gracias-baches-nomenu.jpg" style="display: block; width: 60%; height: auto; margin-left: auto; margin-right: auto;">';
        var customTemplate =
            '<ion-toggle>enable</ion-toggle>' +
            '<label class="item item-input"><input type="text" placeholder="your address"></label>';
        var myPopup = $ionicPopup.show({
        	cssClass: 'claseCustom',
            template: templateImg,
            title: 'alternative location',
            subTitle: 'select this option if GPS is unavailable',
            buttons: [{
                text: 'Aceptar',
                type: 'button-positive',
                onTap: function(e) {

                }
            }]
        });


          //  alert(respuesta.data[0]);

            $scope.showButtons = false;
            $scope.comentarios = "";
        });
   
  
                        },
                        function(err) {
                                $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Debes habilitar el gps'
                            });

                    
                        });
}

$scope.takePic = function(){

      var options = {
            destinationType: Camera.DestinationType.NATIVE_URI,
            //destinationType : Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        // 3
        $cordovaCamera.getPicture(options).then(function(imageData) {

            // 4
            onSuccess(imageData);

            function onSuccess(imageData) {
                // Hacemos referecia al storage y la base de datos

                $scope.imagenPhoto = imageData;
                // alert(imageData);
                $scope.ControlesImagen = true;
                console.log('success');
                //var image = document.getElementById('myImage');
                //image.src = imageData;

                console.log(imageData);

                // var name = imageData.replace(/\\/g,'/').replace( /.*\//, '' );
                // alert(name);
                //alert("se ejecuto todo el sucess de video");
                var url = "http://blognaucalpan.com.mx/sistema/appapis/upload.php";

                //File for Upload
                //var targetPath = document.getElementById("imageid").src;
                //var targetPath = "file:///storage/emulated/0/Pictures/1487802867906.jpg"
                var targetPath = imageData;
                //console.log(pruebaTarget);

                // File name only
                var filename = imageData.replace(/\\/g, '/').replace(/.*\//, '');
                $scope.foto = filename;

                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpeg",
                    params: { 'fileName': filename },
                    headers: { Connection: 'close' }
                };


                $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                    // alert("datos cargados correctamente");
                    //carga de datos en firebase
                    $ionicLoading.hide();
                    $scope.showButtons = true;
                   // database.push({
                     //   usuario: userInfo,
                      //  date: new Date().getTime(),
                       var fotourl = filename;
                       $scope.urlFoto = fotourl;
                       // tipo: "imagen"
                    //})

                    //// fin de carga de datos en firebase


                }, function(err) {
                	$ionicLoading.hide();
                    console.log("ERROR: " + JSON.stringify(err));
                }, function(progress) {

                    //bajando el scroll al final del template del area de mensajes
                    //  var scroller = document.getElementsByClassName("chat")[0];
                    //scroller.scrollTop = scroller.scrollHeight;
                    
                    // PROGRESS HANDLING GOES HERE
                                             $ionicLoading.show({
    							content: 'Loading',
   							 animation: 'fade-in',
   							 showBackdrop: true,
  							  maxWidth: 200,
   							 showDelay: 0
  });
                });




                $scope.$apply();
            }



        }, function(err) {

            console.log(err);
        });

}





});

app.controller('chatController', function(Firebase, Auth, $scope, $location, $sce, ionicp, $http, $cordovaGeolocation) {
    // $scope.infos = "informacion desde controller";
    /*

        Auth.$onAuthStateChanged(function(authData) {


            if (!authData) {
                console.log("Signed out");
                $scope.loggedInUser = null;
              //  $location.path('/welcome');
            } else {


                var mail = authData.email;
                var patron1 = "@";
                var patron2 = ".com";
                mail = mail.replace(patron1, '');
                mail = mail.replace(patron2, '');
                console.log(mail);
                //var link = "http://blognaucalpan.com.mx/sistema/appapis/apialertas.php?dato=";
                var link = "http://blognaucalpan.com.mx/sistema/pages/chat/chatapp.php?database=";
                var linkuser = link.concat(mail);
                var linkusanddb = linkuser + '&username=' + mail;
                //console.log(linkmailubicacion);
                //$scope.infos="http://www.developer.dim3nsoft.com/subir/index.php";
                $scope.infos = authData.email;
                $scope.url = $sce.trustAsResourceUrl(linkusanddb);
                // console.log(mail);





            }
        });


    */
});


app.controller('ControllerDenunciasV2-backUp', function(Firebase, Auth, $scope, $location, $sce, ionicp, $http, $cordovaGeolocation, $cordovaCamera, $cordovaFile) {
    // $scope.infos = "informacion desde controller";
    // 1
    /*
    $scope.images = [];

    //referencia firebase


    $scope.addImage = function() {
        // 2
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        // 3
        $cordovaCamera.getPicture(options).then(function(imageData) {

            // 4
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            // 5
            function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                        fileEntry.copyTo(
                            fileSystem2,
                            newName,
                            onCopySuccess,
                            fail
                        );
                    },
                    fail);
            }

            // 6
            function onCopySuccess(entry) {
                $scope.$apply(function() {
                    $scope.images.push(entry.nativeURL);
                });
            }

            function fail(error) {
                console.log("fail: " + error.code);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

        }, function(err) {
            console.log(err);
        });
    }

    $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
    }
*/
});


app.controller('ControllerDenunciasV2', function(Firebase, Auth, $scope, $location, $sce, ionicp, $http, $cordovaGeolocation, $cordovaCamera, $cordovaFile, $cordovaCapture) {
    // $scope.infos = "informacion desde controller";
    // 1

    //Tomar foto ///
    /*

    $scope.images = [];
    $scope.ControlesImagen = false;



    $scope.addImage = function() {
        // 2
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            //destinationType : Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        // 3
        $cordovaCamera.getPicture(options).then(function(imageData) {

            // 4
            onSuccess(imageData);

            function onSuccess(imageData) {
                // Hacemos referecia al storage y la base de datos

                $scope.imagenPhoto = imageData;
                //alert(imageData);
                $scope.ControlesImagen = true;
                console.log('success');
                //var image = document.getElementById('myImage');
                //image.src = imageData;

                //console.log(imageData);



                $scope.$apply();
            }



        }, function(err) {

            console.log(err);
        });
    }



    function onFail(message) {
        alert('Failed because: ' + message);
    }


    //grabar audio///
    $scope.sound = { name: "" };
    $scope.ControlesAudio = false;


    var captureError = function(e) {
        console.log('captureError', e);
        alert('captureError', e);
    }

    var captureSuccess = function(e) {
        $scope.ControlesAudio = true;
        console.log('captureSuccess');
        console.dir(e);
        $scope.sound.file = e[0].localURL;
        $scope.sound.filePath = e[0].fullPath;
        // alert("ruta  "+$scope.sound.filePath);
        $scope.ruta = $scope.sound.filePath;
        $scope.$apply();
    }

    $scope.record = function() {
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }

    $scope.play = function() {
        if (!$scope.sound.file) {
            navigator.notification.alert("Record a sound first.", null, "Error");
            return;
        }
        var media = new Media($scope.sound.file, function(e) {
            media.release();
        }, function(err) {
            console.log("media err", err);
        });
        // alert("fichero"+$scope.sound.file);
        $scope.audioPlaying = media;
        media.play();
    }

    $scope.stop = function() {

        // alert("fichero pausado"+$scope.sound.file);
        $scope.audioPlaying.stop();
        //media.stop();

    }

    ///CAPTURAR VIDEO }

    $scope.captureVideo = function() {

        navigator.device.capture.captureVideo(VcaptureSuccess, VcaptureError, { limit: 1 });

    }


    var VcaptureError = function(e) {

        alert('captureError', e);
    }



    var VcaptureSuccess = function(s) {
        $scope.ControlesVideo = true;
        //  alert(s[0]);
        // alert("ejectuando sucess de video");
        //alert(s[0].fullPath);

        //console.log('captureSuccess');console.dir(s);
        // $scope.video.filePath = s[0].fullPath;
        //alert("ruta  "+$scope.video.filePath);
        $scope.videofile = s[0].fullPath;
        $scope.$apply();
        //alert("se ejecuto todo el sucess de video");
    }


*/
});

//CONTROLER UBICACION

app.controller('controllerUbicacion', function($http, $scope, $stateParams,$state) {


//alert($stateParams.longi);


    var latLng = new google.maps.LatLng($stateParams.lati, $stateParams.longi);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  
  google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 
});


    });





// CONTROLER CAHT2





app.controller('chat2Controller', function(Firebase, $scope, $location, $firebaseArray, $timeout, $cordovaCapture, $cordovaCamera, $cordovaFile, $base64, $cordovaFileTransfer, $localStorage, $http, $ionicScrollDelegate,$cordovaGeolocation,MapService,$location,$ionicPopup,$ionicLoading,$state,$stateParams) {
$scope.hoy = new Date().toLocaleDateString();
var talerta =  $stateParams.tipoAlerta;
$scope.talert = talerta;

function sendTitulo (){



var userInfo = $localStorage.email;



  var link = 'http://blognaucalpan.com.mx/sistema/appapis/actualizaEstatusAlerta.php';
        $http.post(link, { correo: $localStorage.email, alerta: talerta }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });


function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}

	if(talerta==$localStorage.titulo){
		$localStorage.titulo=talerta;

	}else{    

    var mail = userInfo;
    var bdname;
    var patron1 = "@";
    bdname = mail.replace(patron1, '');
    bdname = replaceAll(bdname, ".", "");
    var referencia = firebase.database().ref().child(bdname);
 	var mensajeTitulo = $firebaseArray(referencia);

    var nuevoMensaje = {
    		usuario: userInfo,
            titulo: talerta,
            date: new Date().getTime(),
            fecha: new Date().toLocaleDateString(),
            tipo : "titulo"    
        };
       mensajeTitulo.$add(nuevoMensaje);
       nuevoMensaje = "";
       $localStorage.titulo=talerta;

        $timeout(function() {
           //$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
           var scroller = document.getElementsByClassName("chat")[0];
		   scroller.scrollTop = scroller.scrollHeight;
        }, 100, false);

}

}

sendTitulo();

//alert(talerta);
    //bajando scroll al final de template de mensajes
    //definiendo variable scroller
    $scope.irubicacion = function(message){
       // alert(message.value);
        $state.go('menu.ubicacion', {'longi': message.longitude, 'lati':message.latitude});
    }

$scope.foco = function(){
//$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

  $timeout(function() {

           $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        }, 100, false);
        

}
 
$scope.blur = function(){
  //  $ionicScrollDelegate.$getByHandle('chatScroll').resize();

      $timeout(function() {
      	$ionicScrollDelegate.$getByHandle('chatScroll').resize();
           
        }, 100, false);
           
}



$scope.shareUbication = function (){

    function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}

    var userInfo = $localStorage.email;

    var mail = userInfo;
    var bdname;
    var patron1 = "@";
   // var patron2 = ".com";
    bdname = mail.replace(patron1, '');
    bdname = replaceAll(bdname, ".", "");
    
    //bdname = bdname.replace(patron2, '');
    console.log(bdname);

    var nbdname = "/" + bdname;

    var ref = firebase.database().ref().child(bdname);
 var messages = $firebaseArray(ref);

var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };

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
                                
                               // alert(miubicacion);
                                $ionicLoading.hide();
        var newMessage = {
            tipoalerta: talerta,
            value: miubicacion,
            latitude: lat,
            longitude: longi,
            date: new Date().getTime(),
            fecha: new Date().toLocaleDateString(),
            usuario: userInfo,
            tipo: "ubicacion"
        };



        messages.$add(newMessage);
        $scope.newmessage.value = "";
        var link = 'http://blognaucalpan.com.mx/sistema/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });
        var link = 'http://blognaucalpan.com.mx/sistema/appapis/actualizaEstatusAlerta.php';
        $http.post(link, { correo: $localStorage.email, alerta: talerta }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });

                           }).error(function(data){
                $ionicLoading.hide();
          
                var alertPopup = $ionicPopup.alert({
                        title: 'Error al cargar ubicacion',
                        template: 'Verifique el sensor gps'
                    });
            });
  
                        },
                        function(err) {
                                $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Si deseas que tu ubiación sea proporcionada, habilita gps'
                            });

                    
                        });
}





function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}
   // var scroller = document.getElementsByClassName("chat")[0];
    var userInfo = $localStorage.email;
    var mail = userInfo;
    var bdname;
    var patron1 = "@";
    bdname = mail.replace(patron1, '');
    bdname = replaceAll(bdname, ".", "");
    var nbdname = "/" + bdname;
    $scope.localuser = userInfo;
    $scope.getClassMessage = function(User) {
        if (User == userInfo)
            return "message message-mine"
        else
            return "message message-other"
    }
    var ref = firebase.database().ref().child(bdname);
    var database = firebase.database().ref(nbdname);
    var storage = firebase.storage().ref('images');
    var messages = $firebaseArray(ref);
    $scope.messages = messages;

    var scroller = document.getElementsByClassName("chat")[0];
	scroller.scrollTop = scroller.scrollHeight;

  
  $scope.sendMessage = function() {

       if (!$scope.newmessage || !$scope.newmessage.value)
            return alert("Escribe el mensaje");
         var link = 'http://blognaucalpan.com.mx/sistema/appapis/actualizaEstatusAlerta.php';
        $http.post(link, { correo: $localStorage.email, alerta: talerta }).then(function(res) {
           
        });

        var link = 'http://blognaucalpan.com.mx/sistema/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
                  });


        var newMessage = {
            tipoalerta: talerta,
            value: $scope.newmessage.value,
            date: new Date().getTime(),
            fecha: new Date().toLocaleDateString(),
            usuario: userInfo,
            tipo: "mensaje"
        };

        messages.$add(newMessage);
        $scope.newmessage.value = "";
    }

    ref.on('value', function(messagesSnap) {
        $timeout(function() {
         //   $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

            var scroller = document.getElementsByClassName("chat")[0];
			scroller.scrollTop = scroller.scrollHeight;
        }, 100, false);
    });

    ///////////////CAPTURA DE VIDEO, IMAGEN Y AUDIO

    $scope.images = [];



    //CAPTURAR IMAGEN
    $scope.addImage = function() {
        // 2
        var options = {
            destinationType: Camera.DestinationType.NATIVE_URI,
            //destinationType : Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

           $cordovaCamera.getPicture(options).then(function(imageData) {
            onSuccess(imageData);
            function onSuccess(imageData) {
            	 $timeout(function() {
              $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        }, 50, false);
                $scope.imagenPhoto = imageData;
                $scope.ControlesImagen = true;
                var url = "http://blognaucalpan.com.mx/sistema/files/upload.php";
                var targetPath = imageData;
                var filename = imageData.replace(/\\/g, '/').replace(/.*\//, '');

                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpeg",
                    params: { 'fileName': filename },
                    headers: { Connection: 'close' }
                };


               $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                    // alert("datos cargados correctamente");
                    //carga de datos en firebase
                    $scope.uploadProgress = 0;
                    database.push({
                        tipoalerta: talerta,
                        usuario: userInfo,
                        date: new Date().getTime(),
                        fecha: new Date().toLocaleDateString(),
                        value: "http://blognaucalpan.com.mx/sistema/files/uploads/" + filename,
                        tipo: "imagen"
                    })

                    //// fin de carga de datos en firebase

 var link = 'http://blognaucalpan.com.mx/sistema/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });

         var link = 'http://blognaucalpan.com.mx/sistema/appapis/actualizaEstatusAlerta.php';
        $http.post(link, { correo: $localStorage.email, alerta: talerta }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });

var scroller = document.getElementsByClassName("chat")[0];
scroller.scrollTop = scroller.scrollHeight;

                }, function(err) {
                    console.log("ERROR: " + JSON.stringify(err));
                }, function(progress) {
                    //bajando el scroll al final del template del area de mensajes
                    // PROGRESS HANDLING GOES HERE
                    $timeout(function() {
                        $scope.uploadProgress = (progress.loaded / progress.total) * 100;

                        console.log($scope.uploadProgress);
                    })
                });
               $scope.$apply();
            }
        }, function(err) {
            console.log(err);
        });
    }

    //grabar audio///
    $scope.sound = { name: "" };

    var captureError = function(e) {
        console.log('captureError', e);
        //  alert('captureError' ,e);
    }

    var captureSuccess = function(e) {
        $scope.ControlesAudio = true;
        console.log('captureSuccess');
        console.dir(e);
        $scope.sound.file = e[0].localURL;
        $scope.sound.filePath = e[0].fullPath;
        // alert("ruta  "+$scope.sound.filePath);
        $scope.ruta = $scope.sound.filePath;

        //SUBIR AUDIO A SERVIDOR Y AGREGAR REGISTRO A FIREBASE

        var url = "http://blognaucalpan.com.mx/sistema/files/upload.php";

        var targetPath = $scope.sound.filePath;;
     
        // File name only
        var filename = $scope.sound.filePath.replace(/\\/g, '/').replace(/.*\//, '');
        // alert("fiilename con patron: " + filename);

        //alert(targetPath);
        //  alert(filename);
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "audio/mpeg",
            params: { 'fileName': filename },
            headers: { Connection: 'close' }
        };


        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            // alert("datos cargados correctamente");
            //carga de datos en firebase
            filename = filename.replace(/%20/g, "");
            //  alert("filename sin patron" + filename);

            $scope.uploadProgress = 0;
            database.push({
                tipoalerta: talerta,
                usuario: userInfo,
                date: new Date().getTime(),
                fecha: new Date().toLocaleDateString(),
                value: "http://blognaucalpan.com.mx/sistema/files/uploads/" + filename,
                tipo: "audio"
            })

            //// fin de carga de datos en firebase

         var link = 'http://blognaucalpan.com.mx/sistema/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });
                 var link = 'http://blognaucalpan.com.mx/sistema/appapis/actualizaEstatusAlerta.php';
        $http.post(link, { correo: $localStorage.email, alerta: talerta }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });

        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function(progress) {

            //bajando el scroll al final del template del area de mensajes
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
            // PROGRESS HANDLING GOES HERE
            $timeout(function() {
                $scope.uploadProgress = (progress.loaded / progress.total) * 100;

                console.log($scope.uploadProgress);
            })
        });


        $scope.$apply();
    }

    $scope.record = function() {
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }

    $scope.play = function() {
        if (!$scope.sound.file) {
            navigator.notification.alert("Record a sound first.", null, "Error");
            return;
        }
        var media = new Media($scope.sound.file, function(e) {
            media.release();
        }, function(err) {
            console.log("media err", err);
        });
        //  alert("fichero" + $scope.sound.file);
        $scope.audioPlaying = media;
        media.play();
    }

    $scope.stop = function() {

        //  alert("fichero pausado" + $scope.sound.file);
        $scope.audioPlaying.stop();
        //media.stop();

    }

    ///CAPTURAR VIDEO }

    $scope.captureVideo = function() {

        navigator.device.capture.captureVideo(VcaptureSuccess, VcaptureError, { limit: 1 });

    }


    var VcaptureError = function(e) {

        alert('captureError', e);
    }



    var VcaptureSuccess = function(s) {
     
        $scope.videofile = s[0].fullPath;

        //alert("se ejecuto todo el sucess de video");
        var url = "http://blognaucalpan.com.mx/sistema/files/upload.php";
        var targetPath = s[0].fullPath;

        var filename = s[0].name;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "video/mp4",
            params: { 'fileName': filename },
            headers: { Connection: 'close' }
        };


        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            // alert("datos cargados correctamente");
            //carga de datos en firebase
            $scope.uploadProgress = 0;
            database.push({
                tipoalerta: talerta,
                usuario: userInfo,
                date: new Date().getTime(),
                fecha: new Date().toLocaleDateString(),
                value: "http://blognaucalpan.com.mx/sistema/files/uploads/" + s[0].name,
                tipo: "video"
            })

             var link = 'http://blognaucalpan.com.mx/sistema/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });
           var link = 'http://blognaucalpan.com.mx/sistema/appapis/actualizaEstatusAlerta.php';
        $http.post(link, { correo: $localStorage.email, alerta: talerta }).then(function(res) {
            //$scope.response = res.data;
            console.log(res.data);
        });

            //// fin de carga de datos en firebase
            var scroller = document.getElementsByClassName("chat")[0];
scroller.scrollTop = scroller.scrollHeight;

        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function(progress) {

            //bajando el scroll al final del template del area de mensajes
            //  var scroller = document.getElementsByClassName("chat")[0];
            //scroller.scrollTop = scroller.scrollHeight;
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
            // PROGRESS HANDLING GOES HERE
            $timeout(function() {
                $scope.uploadProgress = (progress.loaded / progress.total) * 100;

                console.log($scope.uploadProgress);
            })
        });
        $scope.$apply();
    }
});


app.controller('ControllerPanico', function($scope, StorageService, $cordovaSms, $localStorage, $cordovaGeolocation, $location, $ionicPopup) {
    $scope.things = StorageService.getAll();

    $scope.add = function(nombre, telefono) {
        //StorageService.add(nombre);

        console.log(nombre + telefono);
        StorageService.setArray(nombre, telefono);
        //  var datos = StorageService.iData(4);
        //console.log(datos);
    };

    $scope.remove = function(thing) {
        StorageService.remove(thing);
    };

    $scope.lstorage = function() {
        $localStorage.mivariable = "hola chernobil";
        alert($localStorage.mivariable);


    };


    $scope.arreglo = function() {
        StorageService.exArray();
    };

    $scope.getarreglo = function() {
        var tamaño = StorageService.getLength();
        var contactos = [];


        // var contactosjson = [];
        console.log("datos guardados: " + tamaño);
        for (var i = 0; i < tamaño; i++) {
            contactos = StorageService.getArray(i);
            console.log("Telefono [" + i + "]: " + contactos[0].telefono + "de: " + contactos[0].nombre);
        }

    };

    /*
        document.addEventListener("deviceready", function() {

            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: '' // send SMS with the native android SMS messaging
                        //intent: '' // send SMS without open any other app
                        //intent: 'INTENT' // send SMS inside a default SMS app
                }
            };

            $scope.sendSMS = function() {

                var tamaño = StorageService.getLength();


                var contactos = [];
                // var contactosjson = [];
                console.log("datos guardados: " + tamaño);

                var posOptions = { timeout: 20000, enableHighAccuracy: false };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) {

                            // alert("enviando alerta con gps");
                            var lat = position.coords.latitude
                            $localStorage.latitudeL = lat;
                            var longi = position.coords.longitude
                            $localStorage.longitudeL = longi;
                            console.log(lat + " --- " + longi);
                            var ubicacion = "http://maps.google.com/?q=" + lat + "%20" + longi;

                            $localStorage.ubicacionL = ubicacion;



                            for (var i = 0; i < tamaño; i++) {
                                contactos = StorageService.getArray(i);
                                console.log("Telefono [" + i + "]: " + contactos[0].telefono + "de: " + contactos[0].nombre);
                                //alert("enviando a :"+contactos[0].telefono);

                                $cordovaSms
                                    .send(contactos[0].telefono, 'Alerta panico- Ubicación:  ' + $localStorage.ubicacionL, options)
                                    .then(function() {
                                        // alert('Success');
                                        // Success! SMS was sent
                                    }, function(error) {
                                        var alertPopup = $ionicPopup.alert({
                                            title: '¡Error!',
                                            template: 'Error al enviar alertas'
                                        });


                                        // alert('Error');
                                        // An error occurred
                                    });
                            }
                        },
                        function(err) {
                         
                            var lat = "null";
                            $localStorage.latitudeL = lat;
                            var longi = "null";
                            $localStorage.longitudeL = longi;
                            console.log(lat + " --- " + longi);
                            var ubicacion = "No disponible";
                            $localStorage.ubicacionL = ubicacion;


                            for (var i = 0; i < tamaño; i++) {
                                contactos = StorageService.getArray(i);
                                console.log("Telefono [" + i + "]: " + contactos[0].telefono + "de: " + contactos[0].nombre);
                                // alert("enviando a :"+contactos[0].telefono);

                                $cordovaSms
                                    .send(contactos[0].telefono, 'Alerta panico- Ubicación:  ' + $localStorage.ubicacionL, options)
                                    .then(function() {
                                        // alert('Success');
                                        // Success! SMS was sent
                                    }, function(error) {

                                        var alertPopup = $ionicPopup.alert({
                                            title: '¡Error!',
                                            template: 'Error al enviar alertas'
                                        });

                                        // alert('Error');
                                        // An error occurred
                                    });



                            }




                        });




            }

        });

    */

});





app.controller('controllerGrupos', function(Firebase, Auth, $scope, $location, $sce, ionicp, $http, $cordovaGeolocation, $state) {

    /*
        var link = 'http://blognaucalpan.com.mx/sistema/appapis/getInvitations.php';
        $http.post(link, { email: "usuario@prueba.com" }).then(function(res) {
            $scope.groups = res.data;
            console.log("base de datos nombre: " + $scope.groups);

        })

        // $scope.infos = "informacion desde controller";

        $scope.abrirGrupo = function() {

            $state.go('menu.chatgrupo', { dbname: 'mibasededatos', chatnombre: ' nombre de mi chat' });
            //$state.go('menu.chatgrupo');


            console.log("si se ejecuta este CrearGrupo");

        }


        $scope.crearGrupo = function() {

            $state.go('menu.creargrupo');


        }

        $scope.alertar = function(nombrechat, dbname) {
            alert("nombre base de datos: " + dbname + " nombre chat : " + nombrechat);
        }
        */

});


app.controller('creargrupoController', function(Firebase, Auth, StorageGrupal, $scope, $location, $sce, ionicp, $http, $cordovaGeolocation, $state) {
    /*
        $scope.things = StorageGrupal.getAll();



        $scope.add = function(nombre, telefono) {
            //StorageService.add(nombre);
            console.log($scope.things);
            console.log(nombre + telefono);
            StorageGrupal.setArray(nombre, telefono);
            var datos = StorageGrupal.iData(4);
            console.log(datos);
        };

        $scope.remove = function(thing) {
            StorageGrupal.remove(thing);
        };


        $scope.arreglo = function() {
            StorageGrupal.exArray();
        };

        $scope.getarreglo = function() {
            var tamaño = StorageGrupal.getLength();
            var contactos = [];


            // var contactosjson = [];
            console.log("datos guardados: " + tamaño);
            for (var i = 0; i < tamaño; i++) {
                contactos = StorageGrupal.getArray(i);
                console.log("Telefono [" + i + "]: " + contactos[0].telefono + "de: " + contactos[0].nombre);
            }

        };

        $scope.enviarInvitacion = function() {



            var tamaño = StorageGrupal.getLength();
            var contactos = [];
            for (var i = 0; i < tamaño; i++) {
                contactos.push(StorageGrupal.getArray(i)[0].telefono);
                // console.log("Telefono ["+i+"]: "+ contactos[0].telefono + "de: "+ contactos[0].nombre);
            }

            for (var i = 0; i < (10 - tamaño); i++) {
                contactos.push("null");
            }
            var timestamp = new Date().getTime();
            var nombregrupo = document.getElementById("nombregrupo").value;


            function Employee(telefono1, telefono2, telefono3, telefono4, telefono5, telefono6, telefono7, telefono8, telefono9, telefono10, basededatos, nombregrupo) {
                this.telefono1 = telefono1;
                this.telefono2 = telefono2;
                this.telefono3 = telefono3;
                this.telefono4 = telefono4;
                this.telefono5 = telefono5;
                this.telefono6 = telefono6;
                this.telefono7 = telefono7;
                this.telefono8 = telefono8;
                this.telefono9 = telefono9;
                this.telefono10 = telefono10;
                this.bdname = basededatos;
                this.nombregrupo = nombregrupo;

            }

            var employeeObject = new Employee(contactos[0], contactos[1], contactos[2], contactos[3], contactos[4], contactos[5], contactos[6], contactos[7], contactos[8], contactos[9], timestamp, nombregrupo);
            var contactosjson = JSON.stringify(employeeObject);

            var link = 'http://blognaucalpan.com.mx/sistema/appapis/generarInvitacion.php';
            $http.post(link, contactosjson).then(function(res) {
                $scope.datos = res.data;
                console.log("base de datos nombre: " + $scope.data);

            })

        }
    */

});



app.controller('ControllerSMS', function($http, $scope, StorageService, MapService, $cordovaSms, $localStorage, $cordovaGeolocation, $location, $ionicPopup,$ionicLoading,$ionicSideMenuDelegate,$state,$stateParams) {
$ionicSideMenuDelegate.canDragContent(true);

    //habilitar gps 

    function checkAvailability() {
        cordova.plugins.diagnostic.isGpsLocationAvailable(function(available) {
            console.log("GPS location is " + (available ? "available" : "not available"));
            if (!available) {
                checkAuthorization();
            } else {
                console.log("GPS location is ready to use");
            }
        }, function(error) {
            console.error("The following error occurred: " + error);
        });
    }

    function checkAuthorization() {
        cordova.plugins.diagnostic.isLocationAuthorized(function(authorized) {
            console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
            if (authorized) {
                checkDeviceSetting();
            } else {
                cordova.plugins.diagnostic.requestLocationAuthorization(function(status) {
                    switch (status) {
                        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                            console.log("Permission granted");
                            checkDeviceSetting();
                            break;
                        case cordova.plugins.diagnostic.permissionStatus.DENIED:
                            console.log("Permission denied");
                            // User denied permission
                            break;
                        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                            console.log("Permission permanently denied");
                            // User denied permission permanently
                            break;
                    }
                }, function(error) {
                    console.error(error);
                });
            }
        }, function(error) {
            console.error("The following error occurred: " + error);
        });
    }

    function checkDeviceSetting() {
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled) {
            console.log("GPS location setting is " + (enabled ? "enabled" : "disabled"));
            if (!enabled) {
                cordova.plugins.locationAccuracy.request(function(success) {
                    console.log("Successfully requested high accuracy location mode: " + success.message);
                }, function onRequestFailure(error) {
                    console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
                    if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                        if (confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }
        }, function(error) {
            console.error("The following error occurred: " + error);
        });
    }

    checkAvailability(); // start the check


     document.addEventListener("deviceready", function() {

  
    // console.log("si entra a device ready");

$scope.alEmergencia = function(){
    //var alerta = "emergencia";
$state.go('menu.c4', {'tipoAlerta' : "Emergencia"});
}

$scope.alBomberos = function(){
    //var alerta = "emergencia";
$state.go('menu.c4', {'tipoAlerta' : "Bomberos"});
}

$scope.alTransito = function(){
    //var alerta = "emergencia";
$state.go('menu.c4', {'tipoAlerta' : "Transito"});
}

$scope.alGenero = function(){
    //var alerta = "emergencia";
$state.go('menu.c4', {'tipoAlerta' : "Genero"});
}


    $scope.sendSMS = function() {

/*
    	function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
*/


  var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: '' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
        }
    };
        //  console.log("entrando a funcion sendSMS");
        // if ($localStorage.nombre == undefined) {
        	var lati = "";
        	var longi = "";
        	var miubicacion = "";
            var contactos = []; 
        var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };
        var link = 'http://blognaucalpan.com.mx/sistema/appapis/getNombre.php';
        $http.post(link, { email: $localStorage.email }).then(function(res) {
          //  $scope.nombre = res.data;

          //  $localStorage.nombre = res.data;
            $scope.nombre = res.data;
            // alert($localStorage.nombre);
            var tamaño = StorageService.getLength();
            //   alert("numero de contactos:" + tamaño);
            if (tamaño > 0) {
                // var contactosjson = [];
                console.log("datos guardados: " + tamaño);

                
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) { 
                         /*   var alertPopup = $ionicPopup.alert({
                                title: 'Enviando alertas!',
                                template: 'procesando alertas...'
                            });*/

                             $ionicLoading.show({
    							content: 'Loading',
   							 animation: 'fade-in',
   							 showBackdrop: true,
  							  maxWidth: 200,
   							 showDelay: 0
  });
                            var lat = position.coords.latitude;
                           // $localStorage.latitudeL = lat;
                            var longi = position.coords.longitude;
                           
                               // alert("latitud: "+lat+" Longitud: "+longi);
                           // $localStorage.longitudeL = longi;
                            //console.log(lat + " --- " + longi);
                           // var ubicacion = "http://maps.google.com/?q=" + lat + "%20" + longi;
                            // $localStorage.ubicacionL = ubicacion;
                            MapService.getUbicacion(lat,longi).then(function(dataUbi){
                            	var miubicacion = "" ;
                            	//sleep(2000);
                            	miubicacion = dataUbi.results[0].formatted_address;
                            	//alert("Ubicacion desde promesa: " + miubicacion);
                            //});


                          //  MapService.getUbicacion(lat, longi).success(function(data) {
                                //miubicacion =" mi ubicacion es desde controller: "+data.results[0].formatted_address;

                               // miubicacion = data.results[0].formatted_address;

                                //  console.log(ubicacion);
                                
                                for (var i = 0; i < tamaño; i++) {
                                    contactos = StorageService.getArray(i);

                                 //   alert("entrando a for ");
                                  //  alert(contactos[0].telefono);
                                    $scope.mensaje = 'Alerta panico de ' + $scope.nombre + ' Mi Ubicación es:  ' + miubicacion;
                                                                       // console.log("Telefono [" + i + "]: " + contactos[0].telefono + "de: " + contactos[0].nombre);
                                    //  alert("enviando a :"+contactos[0].telefono);
                                    $cordovaSms
                                        .send(contactos[0].telefono, $scope.mensaje, options)
                                        //.send(contactos[0].telefono, 'Alerta panico de ' + $localStorage.nombre + ' Prueba sin ubicacion  ', options)
                                        .then(function() {
                                            // alert('Success');
                                            // Success! SMS was sent
                                            // alert(miubicacion);
                                            $ionicLoading.hide();
                                            alert("alerta enviada con exito");
                                        }, function(error) {

											$ionicLoading.hide();
                                            var alertPopup = $ionicPopup.alert({
                                                title: '¡Error!',
                                                template: 'Error al enviar alertas'
                                            });
                                            // alert('Error');
                                            // An error occurred
                                        });
                                }

                            }).error(function(data){
                $ionicLoading.hide();
          
                var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Verifique sus datos'
                    });
            });
  
                        },
                        function(err) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Enviando alertas!',
                                template: 'Si deseas que tu ubiación sea proporcionada, habilita gps'
                            });

                            //alert('code: '    + err.code    + '\n' + 'message: ' + err.message + '\n');
                            for (var i = 0; i < tamaño; i++) {
                                contactos = StorageService.getArray(i);
                                // console.log("Telefono ["+i+"]: "+ contactos[0].telefono + "de: "+ contactos[0].nombre);
                                //  alert("enviando a :"+contactos[0].telefono);

                                $cordovaSms
                                    .send(contactos[0].telefono, 'Alerta panico de ' + $localStorage.nombre + ' Ubicación no disponible.  ', options)
                                    .then(function() {
                                        // alert('Success');
                                        // Success! SMS was sent
                                    }, function(error) {
                                        var alertPopup = $ionicPopup.alert({
                                            title: '¡Error!',
                                            template: 'Error al enviar alertas'
                                        });

                                        // An error occurred
                                    });
                            }
                        });

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: 'Para enviar la alerta es necesario registrar tus contactos'
                });
            }

        });

    }


    });



});


app.controller('TestController', function($http, $scope, StorageService, MapService, $cordovaSms, $localStorage, $cordovaGeolocation, $location) {




    //habilitar gps 

    function checkAvailability() {
        cordova.plugins.diagnostic.isGpsLocationAvailable(function(available) {
            console.log("GPS location is " + (available ? "available" : "not available"));
            if (!available) {
                checkAuthorization();
            } else {
                console.log("GPS location is ready to use");
            }
        }, function(error) {
            console.error("The following error occurred: " + error);
        });
    }

    function checkAuthorization() {
        cordova.plugins.diagnostic.isLocationAuthorized(function(authorized) {
            console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
            if (authorized) {
                checkDeviceSetting();
            } else {
                cordova.plugins.diagnostic.requestLocationAuthorization(function(status) {
                    switch (status) {
                        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                            console.log("Permission granted");
                            checkDeviceSetting();
                            break;
                        case cordova.plugins.diagnostic.permissionStatus.DENIED:
                            console.log("Permission denied");
                            // User denied permission
                            break;
                        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                            console.log("Permission permanently denied");
                            // User denied permission permanently
                            break;
                    }
                }, function(error) {
                    console.error(error);
                });
            }
        }, function(error) {
            console.error("The following error occurred: " + error);
        });
    }

    function checkDeviceSetting() {
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled) {
            console.log("GPS location setting is " + (enabled ? "enabled" : "disabled"));
            if (!enabled) {
                cordova.plugins.locationAccuracy.request(function(success) {
                    console.log("Successfully requested high accuracy location mode: " + success.message);
                }, function onRequestFailure(error) {
                    console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
                    if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                        if (confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }
        }, function(error) {
            console.error("The following error occurred: " + error);
        });
    }

    checkAvailability(); // start the check

    // document.addEventListener("deviceready", function() {

    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: '' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
        }
    };
        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
    // console.log("si entra a device ready");

    $scope.testGPS = function() {


                var posOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function(position) {
                         

                      
               miUbicacion.lat = position.coords.latitude;
                miUbicacion.lng = position.coords.longitude;
                
                var key = " AIzaSyA5ZHPGcD8_yZ1K3rrDomB9SiDXt2IXpxU";

                MapService.get(miUbicacion.lat,miUbicacion.lng,key).success(function(data){
            
                    ubicacion =" mi ubicacion es: "+data.results[0].formatted_address; 
                    alert(ubicacion);   


 }).error(function(data){
                $ionicLoading.hide();
          
                var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Verifique sus datos'
                    });
            });



                        },
                        function(err) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: 'Si deseas que tu ubiación sea proporcionada, habilita gps'
                            });

                     
                        });

            

        }

$scope.testSMS = function (){

 $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

      $cordovaSms.send(5559590459, 'Prueba de plugin de mensaje de texto ', options)
     // $cordovaSms.send(9671154043, 'Prueba de plugin de mensaje de texto ', options)
                                    .then(function() {
                                        $ionicLoading.hide();
                                         alert('Mensaje enviado');
                                        // Success! SMS was sent
                                    }, function(error) {
                                        $ionicLoading.hide();
                                        var alertPopup = $ionicPopup.alert({
                                            title: '¡Error!',
                                            template: 'Error al enviar sms'
                                        });
                                       
                                        // An error occurred
                                    });



}

$scope.testLocal = function (){
    var tamaño = StorageService.getLength();
    alert("Tamaño: "+ tamaño);
          for (var i = 0; i < tamaño; i++) {
                                    contactos = StorageService.getArray(i);
                                  //  console.log("Telefono [" + i + "]: " + contactos[0].telefono + "de: " + contactos[0].nombre);
                                    //  alert("enviando a :"+contactos[0].telefono);
                                    alert( contactos[0].telefono );
                                 
                                }
}


$scope.testLocal1 = function (){

ServicioUbicacion.getUbication().then(function(messages){
alerta(messages);

});


}


    });