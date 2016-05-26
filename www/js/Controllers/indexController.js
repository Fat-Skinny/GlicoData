app.controller('indexController', ['$state','$scope','DBService','toastr', function ($state,$scope,DBService,toastr) {
    DBService.createTables();

    $scope.goToRM = function(){
        $state.go('rl');
    };

    $scope.goToRC = function(){
        $state.go('rc');
    };

    $scope.goToOT = function () {
        $state.go('ot');
    }

    cordova.plugins.notification.local.on("click", function(notification) {
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
              switch (notification.id) {
                case 1:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].BREAKFAST_TIME = clicktime;
                  break;
                case 2:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].MIDDLEMORNINGLUNCH_TIME = clicktime;
                  break;
                case 3:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].LUNCH_TIME = clicktime;
                  break;
                case 4:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].AFTERNOONLUNCH_TIME = clicktime;
                  break;
                case 5:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].DINNER_TIME = clicktime;
                  break;
                case 6:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].BEDTIME_TIME = clicktime;
                  break;
                default:
                  break;
              }
              DBService.setFloatingRegister(res[0]);
              $state.go('rm');
            }
          },function(error){
              toastr.error(error);
          });
        }else{
          DBService.getLastTenRegisters().then(function(res){
            if(res != "NO REGISTERS FOUND"){
              switch (notification.id) {
                case 1:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].BREAKFAST_TIME = clicktime;
                  break;
                case 2:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].MIDDLEMORNINGLUNCH_TIME = clicktime;
                  break;
                case 3:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].LUNCH_TIME = clicktime;
                  break;
                case 4:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].AFTERNOONLUNCH_TIME = clicktime;
                  break;
                case 5:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].DINNER_TIME = clicktime;
                  break;
                case 6:
                  var clicktime = new Date();
                  clicktime.setHours(clicktime.getHours(),clicktime.getMinutes(),0,0);
                  res[0].BEDTIME_TIME = clicktime;
                  break;
                default:
                  break;
              }
              DBService.setFloatingRegister(res[0]);
              $state.go('rm');
            }
          },function(error){
              toastr.error(error);
          });
        }
      },function(error){
        toastr.error(error);
      });
    });
}]);
