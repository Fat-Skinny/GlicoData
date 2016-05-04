app.controller('indexController', ['$state','$scope','DBService','toastr', function ($state,$scope,DBService,toastr) {
    DBService.createTables();

    DBService.getLastThirtyRegisters().then(function(res){
        if(res != "NO REGISTERS FOUND"){
            DBService.setFloatingArray(res);
        }else{
            DBService.setFloatingArray([]);
        }
    },function(error){
        toastr.error(error);
    });

    $scope.goToRM = function(){
        $state.go('rl');
    };
}]);