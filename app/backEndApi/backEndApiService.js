angular.module("AddressList")
    .service("backEndApiService", function($resource, googleApiService){
        this.resource = $resource("http://cmc.im:9005/api/address/:id");
        
        var _this = this;
        
        googleApiService.findCoordinates({
           number: 18,
           street: "avenue de la forêt",
           postcode: 77380 
        }).then(function(data){
            console.log(data);
        });
        
        this.getAddresses = function(){
            return _this.resource.query().$promise;
        };
        
        this.getAddress = function(id){
            return _this.resource.get(id).$promise;
        };
        
        this.postAddress = function(address){
            return _this.resource.save(address).$promise;  
        };
        
        this.editAddress = function(address){
            return _this.resource.save(address).$promise;  
        };
    });