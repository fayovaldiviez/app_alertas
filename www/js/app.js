angular.module('starter', ['ionic', 'ion-floating-menu', 'ngStorage', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.routes'])

.run(function($ionicPlatform, $ionicPopup, $state,$cordovaSplashscreen) {







    $ionicPlatform.ready(function() {

        /*  $ionicPlatform.on("resume", function(){
       setTimeout(function() {
           alert('doc resume 5');
       }, 0);
    });*/

   setTimeout(function() {
   navigator.splashscreen.hide();
}, 5000);
 

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);


        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });



      $ionicPlatform.registerBackButtonAction(function (event) {
            //no hara nada si le aplastan el boton de atras
        }, 100);
})

.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        //'http://srv*.assets.example.com/**'
        'http://appcuautitlanseguro.gobernet.mx/**',
        'http://blognaucalpan.com.mx/**',
        'https://firebasestorage.googleapis.com/**'

    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**'
    ]);
})


.directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];

            attrs.$observe('hrefInappbrowser', function(val) {
                href = val;
            });

            element.bind('click', function(event) {

                window.open(href, '_system', 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
})

.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

            function stopDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}]);