app.controller('registerManagerController', ['$scope','DBService','toastr','$uibModal', function ($scope,DBService,toastr,$uibModal) {
    window.scrollTo(0, 0);
    $scope.register = DBService.getFloatingRegister();

    $scope.updateBreakFast = function(){
        DBService.updateRegister($scope.register.REGISTERDAY,
                                 $scope.register.BREAKFAST_TIME.getTime(),
                                 $scope.register.BREAKFAST_VALUE,0)
        .then(function(res){
            toastr.success("Breakfast altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateMiddleMorning = function(){
        DBService.updateRegister($scope.register.REGISTERDAY,
                                 $scope.register.MIDDLEMORNINGLUNCH_TIME.getTime(),
                                 $scope.register.MIDDLEMORNINGLUNCH_VALUE,1)
        .then(function(res){
            toastr.success("Middle Morning lunch altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateLunch = function(){
        DBService.updateRegister($scope.register.REGISTERDAY,
                                 $scope.register.LUNCH_TIME.getTime(),
                                 $scope.register.LUNCH_VALUE,2)
        .then(function(res){
            toastr.success("Lunch altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateAfternoon = function(){
        DBService.updateRegister($scope.register.REGISTERDAY,
                                 $scope.register.AFTERNOONLUNCH_TIME.getTime(),
                                 $scope.register.AFTERNOONLUNCH_VALUE,3)
        .then(function(res){
            toastr.success("Afternoon lunch altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateDinner = function(){
        DBService.updateRegister($scope.register.REGISTERDAY,
                                 $scope.register.DINNER_TIME.getTime(),
                                 $scope.register.DINNER_VALUE,4)
        .then(function(res){
            toastr.success("Dinner altered with success!");
        },function(error){
            toastr.error(error);
        });
    }

    $scope.updateBedtime = function(){
        DBService.updateRegister($scope.register.REGISTERDAY,
                                 $scope.register.BEDTIME_TIME.getTime(),
                                 $scope.register.BEDTIME_VALUE,5)
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
                      boldTextTitle: "Register Manager",
                      textAlert : "There is six periods available to edit on each register, with each period containing the fields to insert the hour and glicemic values collected during the day.",
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
