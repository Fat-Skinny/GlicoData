app.controller('registersListController', ['$scope','$filter','DBService','toastr','$state','$uibModal', function ($scope,$filter,DBService,toastr,$state,$uibModal) {
    window.scrollTo(0, 0);
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
        var lastRegister = null;
        if(res == 'NO REGISTER FOUND'){
          lastRegister = actualDate.getTime();
        }else if(res != actualDate.getTime()){
          lastRegister = res;
          lastRegister += 24*60*60*1000;
        }
        if(lastRegister != null){
          DBService.insertMissingRegisters(lastRegister,actualDate.getTime());
          DBService.getLastTenRegisters().then(function(res){
            if(res != "NO REGISTERS FOUND"){
              DBService.setFloatingArray(res);
              $scope.listView.registerArrays = res;
            }else{
              DBService.setFloatingArray([]);
            }
          },function(error){
              toastr.error(error);
          });
        }else{
          DBService.getLastTenRegisters().then(function(res){
            if(res != "NO REGISTERS FOUND"){
              DBService.setFloatingArray(res);
              $scope.listView.registerArrays = res;
            }else{
              DBService.setFloatingArray([]);
            }
          },function(error){
              toastr.error(error);
          });
        }
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
        DBService.updateRegister(register.REGISTERDAY,
                                 register.BREAKFAST_TIME.getTime(),
                                 register.BREAKFAST_VALUE,0)
        .then(function(res){
            toastr.success("Breakfast altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateMiddleMorning = function(register){
        DBService.updateRegister(register.REGISTERDAY,
                                 register.MIDDLEMORNINGLUNCH_TIME.getTime(),
                                 register.MIDDLEMORNINGLUNCH_VALUE,1)
        .then(function(res){
            toastr.success("Middle Morning lunch altered with success!");
        },function(error){
            toastr.error(error);
        });
    }


    $scope.updateLunch = function(register){
        DBService.updateRegister(register.REGISTERDAY,
                                 register.LUNCH_TIME.getTime(),
                                 register.LUNCH_VALUE,2)
        .then(function(res){
            toastr.success("Lunch altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateAfternoon = function(register){
        DBService.updateRegister(register.REGISTERDAY,
                                 register.AFTERNOONLUNCH_TIME.getTime(),
                                 register.AFTERNOONLUNCH_VALUE,3)
        .then(function(res){
            toastr.success("Afternoon lunch altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateDinner = function(register){
        DBService.updateRegister(register.REGISTERDAY,
                                 register.DINNER_TIME.getTime(),
                                 register.DINNER_VALUE,4)
        .then(function(res){
            toastr.success("Dinner altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateBedtime = function(register){
        DBService.updateRegister(register.REGISTERDAY,
                                 register.BEDTIME_TIME.getTime(),
                                 register.BEDTIME_VALUE,5)
        .then(function(res){
            toastr.success("Bedtime altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.helpIcon = function(){

        var ModalInstanceCtrl = function ($scope, $uibModalInstance, data) {
                      $scope.data = data;
                      $scope.close = function(/*result*/){
                        $uibModalInstance.close($scope.data);
                      };
                    };

        var data = {
                        boldTextTitle: "Filters and Registers",
                        textAlert : "There is two filters available for use, the specific date filter" +
                                    " bring only the register from the selected date, and the range of dates brings the registers" +
                                    " contained inside the selected range. The registers can be altered by clicking" +
                                    " the details buttons and changing the information on the expanded details.",
                        mode : 'info'
                      }

        var modalInstance = $uibModal.open({
              template: '<div class="modal-body" style="padding:0px">'+
                             '<div class="alert alert-{{data.mode}}" style="margin-bottom:0px">'+
                                 '<button type="button" class="close" data-ng-click="close()" >'+
                                     '<span class="glyphicon glyphicon-remove-circle"></span>'+
                                 '</button>'+
                                 '<strong>{{data.boldTextTitle}}</strong> </br> </br> <div style="text-align: justify;"> {{data.textAlert}} </div>'+
                             '</div>'+
                         '</div>',
              controller: ModalInstanceCtrl
              ,
              backdrop: true,
              keyboard: true,
              backdropClick: true,
              size: 'lg',
              resolve: {
                data: function () {
                  return data;
                }
              }
            });
    }
}]);
