app.controller('othersController', ['$scope','DBService','toastr','$filter','$window', function ($scope,DBService,toastr,$filter,$window) {
  window.scrollTo(0, 0);
  $scope.othersView = {};
  $scope.othersView.now = new Date();
  $scope.othersView.now.setHours(0,0,0,0);
  $scope.othersView.yesterday = new Date($scope.othersView.now.getTime()-86400000);
  $scope.othersView.bf = false;
  $scope.othersView.mml = false;
  $scope.othersView.l = false;
  $scope.othersView.afl = false;
  $scope.othersView.d = false;
  $scope.othersView.bt = false;
  $scope.othersView.options = {
    animation : false
  }
//  $scope.othersView.line = {};

  DBService.getFirstRegisterDate().then(function(res){
      if(res == $scope.othersView.now.getTime()){
          $scope.othersView.firstRegisterDate = new Date(res - 24*60*60*1000*2);
      }else{
          $scope.othersView.firstRegisterDate = new Date(res);
      }
  },function(error){
      $scope.othersView.firstRegisterDate = new Date($scope.othersView.now.getTime()-5184000000);
  });

  cordova.plugins.notification.local.getAll(function (notifications) {
    $scope.othersView.bf_time = new Date();
    $scope.othersView.bf_time.setHours(7,0,0,0);
    $scope.othersView.mml_time = new Date();
    $scope.othersView.mml_time.setHours(10,0,0,0);
    $scope.othersView.l_time = new Date();
    $scope.othersView.l_time.setHours(12,0,0,0);
    $scope.othersView.afl_time = new Date();
    $scope.othersView.afl_time.setHours(16,0,0,0);
    $scope.othersView.d_time = new Date();
    $scope.othersView.d_time.setHours(19,0,0,0);
    $scope.othersView.bt_time = new Date();
    $scope.othersView.bt_time.setHours(23,0,0,0);
    for(i = 0; i < notifications.length ; i++){
      switch (notifications[i].id) {
        case 1:
          $scope.othersView.bf_time = new Date();
          $scope.othersView.bf_time.setTime(notifications[i].data);
          $scope.othersView.bf = true;
          break;
        case 2:
          $scope.othersView.mml_time = new Date();
          $scope.othersView.mml_time.setTime(notifications[i].data);
          $scope.othersView.mml = true;
          break;
        case 3:
          $scope.othersView.l_time = new Date();
          $scope.othersView.l_time.setTime(notifications[i].data);
          $scope.othersView.l = true;
          break;
        case 4:
          $scope.othersView.afl_time = new Date();
          $scope.othersView.afl_time.setTime(notifications[i].data);
          $scope.othersView.afl = true;
          break;
        case 5:
          $scope.othersView.d_time = new Date();
          $scope.othersView.d_time.setTime(notifications[i].data);
          $scope.othersView.d = true;
          break;
        case 6:
          $scope.othersView.bt_time = new Date();
          $scope.othersView.bt_time.setTime(notifications[i].data);
          $scope.othersView.bt = true;
          break;
        default:
          break;
      }
    }
  });

  $scope.othersView.setBFNotification = function() {
    if($scope.othersView.bf == false){
      cordova.plugins.notification.local.cancel(1, function(){});
    }else{
      var time = $scope.othersView.now;
      time.setHours($scope.othersView.bf_time.getHours(),$scope.othersView.bf_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 1,
        text: "Breakfast",
        at: time,
        every: "day",
        led: "FFFFFF",
        data: time.getTime()
      });
    }
  }

  $scope.othersView.setMMLNotification = function() {
    if($scope.othersView.mml == false){
      cordova.plugins.notification.local.cancel(2, function(){});
    }else{
      var time = $scope.othersView.now;
      time.setHours($scope.othersView.mml_time.getHours(),$scope.othersView.mml_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 2,
        text: "Middle morning",
        at: time,
        every: "day",
        led: "FFFFFF",
        data: time.getTime()
      });
    }
  }

  $scope.othersView.setLNotification = function() {
    if($scope.othersView.l == false){
      cordova.plugins.notification.local.cancel(3, function(){});
    }else{
      var time = $scope.othersView.now;
      time.setHours($scope.othersView.l_time.getHours(),$scope.othersView.l_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 3,
        text: "Lunch",
        at: time,
        every: "day",
        led: "FFFFFF",
        data: time.getTime()
      });
    }
  }

  $scope.othersView.setAFLNotification = function() {
    if($scope.othersView.afl == false){
      cordova.plugins.notification.local.cancel(4, function(){});
    }else{
      var time = $scope.othersView.now;
      time.setHours($scope.othersView.afl_time.getHours(),$scope.othersView.afl_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 4,
        text: "Afternoon",
        at: time,
        every: "day",
        led: "FFFFFF",
        data: time.getTime()
      });
    }
  }

  $scope.othersView.setDNotification = function() {
    if($scope.othersView.d == false){
      cordova.plugins.notification.local.cancel(5, function(){});
    }else{
      var time = $scope.othersView.now;
      time.setHours($scope.othersView.d_time.getHours(),$scope.othersView.d_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 5,
        text: "Dinner",
        at: time,
        every: "day",
        led: "FFFFFF",
        data: time.getTime()
      });
    }
  }

  $scope.othersView.setBTNotification = function() {
    if($scope.othersView.bt == false){
      cordova.plugins.notification.local.cancel(6, function(){});
    }else{
      var time = $scope.othersView.now;
      time.setHours($scope.othersView.bt_time.getHours(),$scope.othersView.bt_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 6,
        text: "Bedtime",
        at: time,
        every: "day",
        led: "FFFFFF",
        data: time.getTime()
      });
    }
  }

  $scope.setNotifications = function() {
    $scope.othersView.setBFNotification();
    $scope.othersView.setMMLNotification();
    $scope.othersView.setLNotification();
    $scope.othersView.setAFLNotification();
    $scope.othersView.setDNotification();
    $scope.othersView.setBTNotification();
    toastr.success("Notifications set!");
  }

  $scope.makePDF = function(){
      var start = $scope.othersView.startDate.getTime();
      var end = $scope.othersView.endDate.getTime();
      DBService.getRangeOfRegisters(start,end).then(function(res){
          if(res == "NO REGISTERS FOUND"){
              toastr.error("No register to make a PDF!");
          }else{
            var columns = ["Register Day", "Breakfast", "Middle morning","Lunch","Afternoon","Dinner","Bedtime"];
            var rows = [];
            for(i = 0;i < res.length; i++){
              var data = [];
              data.push($filter('date')((new Date(res[i].REGISTERDAY)), 'dd/MM/yyyy'));
              data.push($filter('date')((new Date(res[i].BREAKFAST_TIME)), 'HH:mm') + " - " + res[i].BREAKFAST_VALUE);
              data.push($filter('date')((new Date(res[i].MIDDLEMORNINGLUNCH_TIME)), 'HH:mm') + " - " + res[i].MIDDLEMORNINGLUNCH_VALUE);
              data.push($filter('date')((new Date(res[i].LUNCH_TIME)), 'HH:mm') + " - " + res[i].LUNCH_VALUE);
              data.push($filter('date')((new Date(res[i].AFTERNOONLUNCH_TIME)), 'HH:mm') + " - " + res[i].AFTERNOONLUNCH_VALUE);
              data.push($filter('date')((new Date(res[i].DINNER_TIME)), 'HH:mm') + " - " + res[i].DINNER_VALUE);
              data.push($filter('date')((new Date(res[i].BEDTIME_TIME)), 'HH:mm') + " - " + res[i].BEDTIME_VALUE);
              rows.push(data);
            }
            var doc = new jsPDF('p', 'pt');
            doc.autoTable(columns, rows);
            window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function(fileSystem) {
             fileSystem.getFile("glicemicRegisters.pdf", {create: true}, function(entry) {
                var fileEntry = entry;
                entry.createWriter(function(writer) {
                   writer.write( doc.output());
                }, function(error) {
                   console.log(error);
                });
             }, function(error){
                console.log(error);
             });
             $window.open(cordova.file.externalCacheDirectory+"/glicemicRegisters.pdf","_system",'location=no');
            },
            function(event){
              console.log( evt.target.error.code );
            });
          }
      },function(error){
          toastr.error(error);
      });
  }

}]);
