app.controller('registersListController', ['$scope','$filter','DBService','toastr','$state', function ($scope,$filter,DBService,toastr,$state) {
    $scope.listView = {};
    $scope.listView.actualDate = new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
    $scope.listView.actualDate.setHours(0,0,0,0);
    $scope.listView.yesterday = new Date($scope.listView.actualDate.getTime()-86400000);
    $scope.listView.TwoMonthsAgo = new Date($scope.listView.actualDate.getTime()-5184000000);
    $scope.listView.registerArrays = DBService.getFloatingArray();
    $scope.listView.specificDate = $scope.listView.actualDate;//$filter('date')($scope.actualDate, 'yyyy-MM-dd');
    $scope.listView.SM = 'SD';

    if($scope.listView.registerArrays == null){
      var actualDate = new Date();
      actualDate.setHours(0,0,0,0);
      DBService.getLastRegisterDate().then(function(res){
        var lastRegister;
        if(res == 'NO REGISTER FOUND'){
          lastRegister = actualDate.getTime();
        }else{
          lastRegister = res.REGISTERDAY;
        }
        DBService.insertMissingRegisters(lastRegister,actualDate.getTime());
        DBService.getLastThirtyRegisters().then(function(res){
          if(res != "NO REGISTERS FOUND"){
            DBService.setFloatingArray(res);
            $scope.listView.registerArrays = res;
          }else{
            DBService.setFloatingArray([]);
          }
        },function(error){
            toastr.error(error);
        });
      },function(error){
        toastr.error(error);
      });

    }

    DBService.getFirstRegisterDate().then(function(res){
        if(res == $scope.listView.actualDate.getTime()){
            $scope.listView.firstRegisterDate = new Date(res - 24*60*60*1000*2);
        }else{
            $scope.listView.firstRegisterDate = new Date(res);
        }
    },function(error){
        $scope.listView.firstRegisterDate = new Date($scope.listView.actualDate.getTime()-5184000000);
    });

    $scope.manageRegister = function(register){
        DBService.setFloatingArray($scope.listView.registerArrays);
        DBService.setFloatingRegister(register);
        $state.go('rm');
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

    $scope.updateBreakFast = function(register){
        if(register.BREAKFAST_TIME == null || register.BREAKFAST_VALUE == null){
            toastr.error("Please fill the fields");
        }else{
            DBService.updateRegister(register.REGISTERDAY,
                                     register.BREAKFAST_TIME.getTime(),
                                     register.BREAKFAST_VALUE,0)
            .then(function(res){
                toastr.success("Breakfast altered with success!");
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.updateMiddleMorning = function(register){
        if(register.MIDDLEMORNINGLUNCH_TIME == null || register.MIDDLEMORNINGLUNCH_VALUE == null){
            toastr.error("Please fill the fields");
        }else{
            DBService.updateRegister(register.REGISTERDAY,
                                     register.MIDDLEMORNINGLUNCH_TIME.getTime(),
                                     register.MIDDLEMORNINGLUNCH_VALUE,1)
            .then(function(res){
                toastr.success("Middle Morning lunch altered with success!");
            },function(error){
                toastr.error(error);
            });
        }
    }


    $scope.updateLunch = function(register){
        if(register.LUNCH_TIME == null || register.LUNCH_VALUE == null){
            toastr.error("Please fill the fields");
        }else{
            DBService.updateRegister(register.REGISTERDAY,
                                     register.LUNCH_TIME.getTime(),
                                     register.LUNCH_VALUE,2)
            .then(function(res){
                toastr.success("Lunch altered with success!");
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.updateAfternoon = function(register){
        if(register.AFTERNOONLUNCH_TIME == null || register.AFTERNOONLUNCH_VALUE == null){
            toastr.error("Please fill the fields");
        }else{
            DBService.updateRegister(register.REGISTERDAY,
                                     register.AFTERNOONLUNCH_TIME.getTime(),
                                     register.AFTERNOONLUNCH_VALUE,3)
            .then(function(res){
                toastr.success("Afternoon lunch altered with success!");
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.updateDinner = function(register){
        if(register.DINNER_TIME == null || register.DINNER_VALUE == null){
            toastr.error("Please fill the fields");
        }else{
            DBService.updateRegister(register.REGISTERDAY,
                                     register.DINNER_TIME.getTime(),
                                     register.DINNER_VALUE,4)
            .then(function(res){
                toastr.success("Dinner altered with success!");
            },function(error){
                toastr.error(error);
            });
        }
    }

    $scope.$watch('listView.startDate', function(newValue, oldValue) {
        if(newValue == null){
            $scope.listView.endDate = null;
        }
    });

}]);
