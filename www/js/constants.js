   angular.module('mensaje.Services')
        .service('constants', constantsService);

    function constantsService() {
        var self = this;        
        self.ubicacion = {};        
        self.send = {};        


    self.ubicacion.get = function (lat,lng,key) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json';
        if (lat) {
            url += "?latlng={0}".replace("{0}", lat)
        }
         if (lng) {
            url += ",{0}".replace("{0}", lng)
        }
        if (key) {
            url += "&key={0}".replace("{0}", key)
        }
        return url;
    };

    self.send.sms = function () {
        var url = 'https://ACd2fdbd69e0b9a27175270fbd664186bc:384c9d89815cac08dc8fa55b1f26f981@api.twilio.com/2010-04-01/Accounts/ACd2fdbd69e0b9a27175270fbd664186bc/Messages.json';        
        
        return url;
    };



    }