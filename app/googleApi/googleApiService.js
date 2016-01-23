angular.module("AddressList")
    .service("googleApiService", function(){
        
        var key = "AIzaSyAo5ZUWrAfIro7qBFUc4F-H_hLNV97H_x4";
        var url = "https://maps.googleapis.com/maps/api/geocode/json?key=" + key + "&address=";
        
        this.findCoordinates = function(address){ 
            return fetch(url + encodeURIComponent(address.number+ " " +address.street+", " + address.city + "," +address.postcode)).then(function(data){
                return data.json();
            }).then(function(data){
                if (data.status == "OK" && data.results.length){
                    var result = data.results[0];
                    return {
                        lat: result.geometry.location.lat,
                        lng: result.geometry.location.lng
                    };
                }else
                    return null;    
            });      
        }
    });