angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('menu1', {
    url: "/menu1",
    abstract: true,
    templateUrl: "/templates/menu.html"
  })

    
          .state('menu.iniciarsesion', {
    url: '/welcome',
    views: {
      'side-menu21': {
        templateUrl: 'templates/welcome/intro.html',
        controller: 'WelcomeCtrl'
       
      }
    }
  })
 
      .state('menu.miPerfil', {
    url: '/account',
    views: {
      'side-menu21': {
        templateUrl: 'templates/account/tab-account.html',
        controller: 'AccountCtrl'
       
      }
    }
  })

      .state('menu.segantiBache', {
    url: '/seguro',
    views: {
      'side-menu21': {
        templateUrl: 'templates/seguro/chat.html',
        controller: 'chatAntibaches'
       
      }
    }
  })


  .state('menu.contactos', {
    url: '/panico',
    views: {
      'side-menu21': {
        templateUrl: 'templates/panico/panico.html',
        controller: 'ControllerPanico'
      
      }
    }
  })


     .state('menu.ubicacion', {
    url: '/share?longi&lati',
    views: {
      'side-menu21': {
        templateUrl: 'templates/share/ubicacion.html',
         params: {'longi':null,'lati':null},
         controller: 'controllerUbicacion'
         
       
       
      }
    }
  })
    .state('menu.sms', {
    url: '/sms',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contactos/contactosSms.html',
        controller: 'ControllerSMS'
        
      
      }
    }
  })

  .state('menu.c4r', {
    url: '/chat2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/grupos/grupos.html',
        controller: 'controllerGrupos'

        
        
      }
    }
  })

   .state('menu.c4', {
    url: '/chatgrupo?tipoAlerta',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chat/tab-chat2.html',
        params: {'tipoAlerta':null},
        controller: 'chat2Controller'
       


        
        
      }
    }
  })

    .state('menu.creargrupo', {
    url: '/creargrupo',
    views: {
      'side-menu21': {
        templateUrl: 'templates/creargrupo/creargrupo.html',
        controller: 'creargrupoController'


        
        
      }
    }
  })

  .state('menu.baches', {
    url: '/denunciar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/denunciar/denunciar.html',
        controller: 'controllerDenuncia'
       
      }
    }
  })

    .state('menu.test', {
    url: '/test',
    views: {
      'side-menu21': {
        templateUrl: 'templates/test/test.html',
        controller: 'TestController'
       
      }
    }
  })

    .state('menu.mapabaches', {
    url: '/mapabaches',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mapabaches/mapabaches.html'       
      }
    }
  })

  .state('menu.faqs', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/faqs/faqs.html'
        
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html'
    
  })

$urlRouterProvider.otherwise('/side-menu21/welcome')

  

});