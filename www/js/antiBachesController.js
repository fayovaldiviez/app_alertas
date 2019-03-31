app.controller('chatAntibaches', function(Firebase, $scope, $location, $firebaseArray, $timeout, $cordovaCapture, $cordovaCamera, $cordovaFile, $base64, $cordovaFileTransfer, $localStorage, $http, $ionicScrollDelegate,$cordovaGeolocation,MapService,$location,$ionicPopup,$ionicLoading,$state,$stateParams) {



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

    var nbdname = "/seguroAntibache/" + bdname;

    var ref = firebase.database().ref('seguroAntibache/').child(bdname);
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
            tipoalerta: "seguro",
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
        
        var link = 'http://appcuautitlanseguro.gobernet.mx/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
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
    var nbdname = "/seguroAntibache/" + bdname;
    $scope.localuser = userInfo;
    $scope.getClassMessage = function(User) {
        if (User == userInfo)
            return "message message-mine"
        else
            return "message message-other"
    }
    var ref = firebase.database().ref('seguroAntibache/').child(bdname);
    var database = firebase.database().ref(nbdname);
    var storage = firebase.storage().ref('images');
    var messages = $firebaseArray(ref);
    $scope.messages = messages;
    //alert($scope.messages);

    var scroller = document.getElementsByClassName("chat")[0];
	scroller.scrollTop = scroller.scrollHeight;

  
  $scope.sendMessage = function() {

       if (!$scope.newmessage || !$scope.newmessage.value)
            return alert("Escribe el mensaje");
       
        var link = 'http://appcuautitlanseguro.gobernet.mx/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
                  });


        var newMessage = {
            tipoalerta: "seguro",
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
                var url = "http://appcuautitlanseguro.gobernet.mx/files/upload.php";
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
                        tipoalerta: "seguro",
                        usuario: userInfo,
                        date: new Date().getTime(),
                        fecha: new Date().toLocaleDateString(),
                        value: "http://appcuautitlanseguro.gobernet.mx/files/uploads/" + filename,
                        tipo: "imagen"
                    })

                    //// fin de carga de datos en firebase

 var link = 'http://appcuautitlanseguro.gobernet.mx/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
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

        var url = "http://appcuautitlanseguro.gobernet.mx/files/upload.php";

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
                tipoalerta: "seguro",
                usuario: userInfo,
                date: new Date().getTime(),
                fecha: new Date().toLocaleDateString(),
                value: "http://appcuautitlanseguro.gobernet.mx/files/uploads/" + filename,
                tipo: "audio"
            })

            //// fin de carga de datos en firebase

         var link = 'http://appcuautitlanseguro.gobernet.mx/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
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
        var url = "http://blognaucalpan.com.mx/c4-24/fiscalia/files/upload.php";
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
                tipoalerta: "seguro",
                usuario: userInfo,
                date: new Date().getTime(),
                fecha: new Date().toLocaleDateString(),
                value: "http://appcuautitlanseguro.gobernet.mx/files/uploads/" + s[0].name,
                tipo: "video"
            })

             var link = 'http://appcuautitlanseguro.gobernet.mx/appapis/updateMensajeStatus.php';
        $http.post(link, { correo: $localStorage.email }).then(function(res) {
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
