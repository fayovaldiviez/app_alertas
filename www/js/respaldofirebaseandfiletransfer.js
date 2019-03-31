

        $scope.addInfo = function(){
          console.log(" se ejecuta la funcion");
            //var file = $('#file').get(0).files[0];
            var file = document.getElementById("file").files[0];
            var metadata = {'contentType' : file.type};
            console.log(file);
            console.log(file.name);
            //agregamos la imagen al sto,rage
            storage.child(file.name).put(file,metadata).then(function() {
                //obtenemos la url de descarga de la imagen
                storage.child(file.name).getDownloadURL().then(function (url) {
                    //agregamos la url a nuestra objeto y lo agregamos a firebase
                    //alert(url);
                    //$scope.url = url;
                    console.log(url);
                    database.push({
                        usuario : "genaro",
                        value: url,
                        tipo : "imagen"
                    })
                })
            })

        }



 

$scope.b64 = function() {

   var url = "http://blognaucalpan.com.mx/sistema/files/upload.php";
      
     //File for Upload
     //var targetPath = document.getElementById("imageid").src;
     //var targetPath = "file:///storage/emulated/0/Pictures/1487802867906.jpg"
     var targetPath = cordova.file.externalRootDirectory + "Pictures/IMG_20170130_153312.jpg";
     //console.log(pruebaTarget);
      
     // File name only
     var filename = "prueba2";
      
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'fileName':filename},
          headers : { Connection : 'close'}
      };
           
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          console.log("SUCCESS: " + JSON.stringify(result.response));


      }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });

    $scope.$apply();
    alert("se ejecuto todo el sucess de imagen");

}


$scope.CapFoto = function() {

  navigator.device.capture.captureImage(IcaptureSuccess, IcaptureError, {limit: 1});

}


 var IcaptureError = function(e) {
   
    alert('captureError' ,e);
  }




  var IcaptureSuccess = function(s){

  //  alert(s[0]);
    //alert("ejectuando sucess de imagen");
    //alert(s[0].fullPath);
  //  console.log(s[0].fullPath);
    //console.log("Solo nombre:"+s[0].name);
  

   var url = "http://blognaucalpan.com.mx/sistema/files/upload.php";
      
   
     var targetPath = s[0].fullPath;
     console.log("FILE PATH :" + targetPath);
     console.log("NOMBRE: "+s[0].name);
     // File name only
     var filename = s[0].name;
      


    var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'fileName':filename},
          headers : { Connection : 'close'}
      };
           
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("archivo cargado exitosamente");

      }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));
          
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });



    $scope.$apply();
    alert("se ejecuto todo el sucess de imagen");
  }




    
    

  


$scope.uploadFire = function () {


  
    var targetPath = cordova.file.externalRootDirectory + "Pictures/prueba.jpg";

            //agregamos la imagen al sto,rage
          storage.child("IMG_20170130_153312").put(targetPath).then(function() {
          
                alert("enviando datos");
                storage.child("IMG_20170130_153312").getDownloadURL().then(function (url) {
                    //agregamos la url a nuestra objeto y lo agregamos a firebase
                    //alert(url);
                    //$scope.url = url;
                    alert("regrasando url");
                    console.log(url);
                    database.push({
                        usuario : "genaro",
                        value: url,
                        tipo : "imagen"
                    })
                })
            }) 
    

    $scope.$apply();
    alert("se ejecuto todo el sucess de imagen");
}

