app.controller('registersListController', ['$scope','$filter','DBService','toastr', function ($scope,$filter,DBService,toastr) {
    $scope.actualDate =new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
    $scope.startDate = null;
    $scope.actualYear = $scope.actualDate.getFullYear();
    if($scope.actualDate.getMonth()+1 < 10){
        $scope.actualMonth = '0' +($scope.actualDate.getMonth()+1);
    }else{
        $scope.actualMonth = $scope.actualDate.getMonth()+1;
    }
    if($scope.actualDate.getDate() < 10){
        $scope.actualDay = '0' + $scope.actualDate.getDate();
    }else{
        $scope.actualDay = $scope.actualDate.getDate();
    }
    $scope.specificDate = new Date($scope.actualYear+'-'+$scope.actualMonth+'-'+$scope.actualDay+'T00:00:00');
    $scope.SM = null;
    $scope.SR = false;
    $scope.SD = false;
    $scope.newRegisterDate = new Date($scope.actualYear+'-'+$scope.actualMonth+'-'+$scope.actualDay+'T00:00:00');

    $scope.newRegister = function(registerDate){
        if(registerDate == null || registerDate == ""){
            toastr.error("Date of register is null!");
        }else{
            DBService.verifyRegisterExistence(registerDate.getTime()).then(
            function(res){
                if(res > 0){
                    toastr.error("Date of register already exists!");
                }else{
                    DBService.insertRegister(registerDate.getTime()).then(function(res){
                        toastr.success("Register inserted with success!");
                    },function(error){
                        toastr.error(error);
                    });
                }
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.lastRegisterDate = function(){
        DBService.getFirstRegisterDate().then(function(res){
            return res;
        },function(error){
            return '1900-01-01';
        });
    }

    $scope.yesterday = function (){
        return new Date($scope.actualDate.getTime()-86400000);
    }

    $scope.$watch('SM', function(newValue, oldValue) {
        if(newValue == 'R'){
            $scope.SR = true;
            $scope.SD = false;
        }else if(newValue){
            $scope.SR = false;
            $scope.SD = true;
        }
    });

    $scope.$watch('startDate', function(newValue, oldValue) {
        if(newValue == null){
        $scope.endDate = null;
        }
    });

}]);