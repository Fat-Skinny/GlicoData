app.controller('registersListController', ['$scope','$filter','DBService','toastr','$state', function ($scope,$filter,DBService,toastr,$state) {
    $scope.listView = {};
    $scope.listView.actualDate = new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
    $scope.listView.actualDate.setHours(0,0,0,0);
    $scope.listView.yesterday = new Date($scope.listView.actualDate.getTime()-86400000);
    $scope.listView.TwoMonthsAgo = new Date($scope.listView.actualDate.getTime()-5184000000);
    $scope.listView.registerArrays = DBService.getFloatingArray();
    $scope.listView.specificDate = $scope.listView.actualDate;//$filter('date')($scope.actualDate, 'yyyy-MM-dd');
    $scope.listView.SM = 'SD';
    $scope.listView.newRegisterDate = $scope.listView.actualDate;// $filter('date')($scope.actualDate, 'yyyy-MM-dd');

    DBService.getFirstRegisterDate().then(function(res){
        if(res == $scope.listView.actualDate.getTime()){
            $scope.listView.firstRegisterDate = new Date(res - 24*60*60*1000*2);
        }else{
            $scope.listView.firstRegisterDate = new Date(res);
        }
    },function(error){
        $scope.listView.firstRegisterDate = new Date($scope.listView.actualDate.getTime()-5184000000);
    });

    $scope.newRegister = function(){
        var registerDate = $scope.listView.newRegisterDate.getTime();
        if(registerDate == null || registerDate == ""){
            toastr.error("Date of register is null!");
        }else{
            DBService.verifyRegisterExistence(registerDate).then(
            function(res){
                if(res > 0){
                    toastr.error("Date of register already exists!");
                }else{
                    DBService.insertRegister(registerDate).then(function(res){
                        toastr.success("Register inserted with success!");
                        $scope.getFirstRegisterDate();
                        DBService.getRegister(registerDate).then(function(res){
                            DBService.setFloatingRegister(res[0]);
                            DBService.setFloatingArray($scope.listView.registerArrays);
                            $state.go('rm');
                        },function(error){
                            toastr.error(error);
                        });
                    },function(error){
                        toastr.error(error);
                    });
                }
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.manageRegister = function(register){
        DBService.setFloatingArray($scope.listView.registerArrays);
        DBService.setFloatingRegister(register);
        $state.go('rm');
    }

    $scope.deleteRegister = function(registerDate){
        if(confirm("Do you want to delete the register?")){
            DBService.deleteRegister(registerDate).then(function(res){
                toastr.success("Register deleted with success!");
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.getRangeOfRegisters = function(){
        var start = $scope.listView.startDate.getTime();
        var end = $scope.listView.endDate.getTime();
        DBService.getRangeOfRegisters(start,end).then(function(res){
            if(res == "NO REGISTERS FOUND"){
                toastr.error("NO REGISTERS FOUND");
                $scope.listView.registerArrays = [];
            }else{
                $scope.listView.registerArrays = res;
                DBService.setFloatingArray($scope.listView.registerArrays);
            }
        },function(error){
            toastr.error(error);
        });
    }

    $scope.getRegister = function(){
         var registerDate = $scope.listView.specificDate.getTime();
         DBService.getRegister(registerDate).then(function(res){
             if(res == "NO REGISTERS FOUND"){
                 toastr.error("NO REGISTERS FOUND");
                 $scope.listView.registerArrays = [];
             }else{
                 $scope.listView.registerArrays = res;
                 DBService.setFloatingArray($scope.listView.registerArrays);
             }
         },function(error){
             toastr.error(error);
         });
    }

    $scope.getFirstRegisterDate = function(){
        DBService.getFirstRegisterDate().then(function(res){
            if(res == $scope.listView.actualDate.getTime()){
                $scope.listView.firstRegisterDate = new Date(res - 24*60*60*1000*2);
            }else{
                $scope.listView.firstRegisterDate = new Date(res);
            }
        },function(error){
            $scope.listView.firstRegisterDate = $scope.listView.TwoMonthsAgo;
        });
    }

    $scope.$watch('listView.startDate', function(newValue, oldValue) {
        if(newValue == null){
            $scope.listView.endDate = null;
        }
    });

}]);