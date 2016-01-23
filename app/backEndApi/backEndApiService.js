angular.module("AddressList")
    .service("backEndApiService", function($resource){
        this.resource = $resource("http://cmc.im:9005/api/address/:id");
        
        var _this = this;
        
        this.getAddresses = function(){
            return _this.resource.query().$promise;
        };
        
        this.getAddress = function(id){
            return _this.resource.query().$promise;
        };
        
        this.postAddress = function(address){
            return _this.resource.save(address).$promise;  
        };
    });