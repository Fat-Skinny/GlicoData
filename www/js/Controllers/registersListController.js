app.controller('registersListController', ['$scope','$filter','DBService','toastr', function ($scope,$filter,DBService,toastr) {
    $scope.actualDate = new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
    $scope.actualDate.setHours(0,0,0,0);
    $scope.startDate = null;
    $scope.registerArrays = [];
    document.getElementById("specificDate").value = $filter('date')($scope.actualDate, 'yyyy-MM-dd');
    $scope.SM = null;
    $scope.SR = false;
    $scope.SD = false;
    $scope.firstRegisterDate = $scope.actualDate.getTime()-5184000000;
    document.getElementById("newRegisterDate").value = $filter('date')($scope.actualDate, 'yyyy-MM-dd');

    $scope.newRegister = function(){
        var registerDate = new Date(document.getElementById('newRegisterDate').value);
        registerDate = new Date(registerDate.getTime()+((new Date().getTimezoneOffset())*60*1000));
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
                        $scope.getFirstRegisterDate();
                    },function(error){
                        toastr.error(error);
                    });
                }
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.getRangeOfRegisters = function(){
        var start = $scope.startDate.getTime();
        var end = new Date(document.getElementById('endDate').value).getTime()+((new Date().getTimezoneOffset())*60*1000);
        DBService.getRangeOfRegisters(start,end).then(function(res){
            if(res == "NO REGISTERS FOUND"){
                toastr.error("NO REGISTERS FOUND");
                $scope.registerArrays = [];
            }else{
                $scope.registerArrays = res;
            }
        },function(error){
            toastr.error(error);
        });
    }

    $scope.getRegister = function(){
         var registerDate = new Date(document.getElementById('specificDate').value).getTime()+((new Date().getTimezoneOffset())*60*1000);
         DBService.getRegister(registerDate).then(function(res){
             if(res == "NO REGISTERS FOUND"){
                 toastr.error("NO REGISTERS FOUND");
                 $scope.registerArrays = [];
             }else{
                 $scope.registerArrays = res;
             }
         },function(error){
             toastr.error(error);
         });
    }

    $scope.getFirstRegisterDate = function(){
        DBService.getFirstRegisterDate().then(function(res){
            if(res == $scope.actualDate.getTime() || res == $scope.actualDate.getTime()-86400000){
                $scope.firstRegisterDate = new Date(res - 24*60*60*1000*3);
            }else{
                $scope.firstRegisterDate = new Date(res);
            }
        },function(error){
            $scope.firstRegisterDate = new Date($scope.actualDate.getTime()-5184000000);
        });
    }

    $scope.getFirstRegisterDate();

    $scope.yesterday = function (){
        return new Date($scope.actualDate.getTime()-86400000);
    }

    $scope.TwoMonthsAgo = function (){
        return new Date($scope.actualDate.getTime()-5184000000);
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
            document.getElementById('endDate').value = null;
        }
    });

}]);