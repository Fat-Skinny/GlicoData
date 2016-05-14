app.controller('settingsController', ['$scope','DBService','toastr','$filter', function ($scope,DBService,toastr,$filter) {
  $scope.settingsView = {};
  $scope.settingsView.now = new Date();
  $scope.settingsView.now.setHours(0,0,0,0);
  $scope.settingsView.bf = false;
  $scope.settingsView.mml = false;
  $scope.settingsView.l = false;
  $scope.settingsView.afl = false;
  $scope.settingsView.d = false;

  cordova.plugins.notification.local.isPresent(1, function (present) {
      if(present){
        cordova.plugins.notification.local.get(1, function (notifications) {
          $scope.settingsView.bf_time = new Date();
          $scope.settingsView.bf_time.setTime(notifications.data);
        });
      }else{
        $scope.settingsView.bf_time = new Date();
        $scope.settingsView.bf_time.setHours(7,0,0,0);
      }
      $scope.settingsView.bf = present;
  });

  cordova.plugins.notification.local.isPresent(2, function (present) {
      if(present){
        cordova.plugins.notification.local.get(2, function (notifications) {
          $scope.settingsView.mml_time = new Date();
          $scope.settingsView.mml_time.setTime(notifications.data);
        });
      }else{
        $scope.settingsView.mml_time = new Date();
        $scope.settingsView.mml_time.setHours(10,0,0,0);
      }
      $scope.settingsView.mml = present;
  });

  cordova.plugins.notification.local.isPresent(3, function (present) {
      if(present){
        cordova.plugins.notification.local.get(3, function (notifications) {
          $scope.settingsView.l_time = new Date();
          $scope.settingsView.l_time.setTime(notifications.data);
        });
      }else{
        $scope.settingsView.l_time = new Date();
        $scope.settingsView.l_time.setHours(12,0,0,0);
      }
      $scope.settingsView.l = present;
  });

  cordova.plugins.notification.local.isPresent(4, function (present) {
      if(present){
        cordova.plugins.notification.local.get(4, function (notifications) {
          $scope.settingsView.afl_time = new Date();
          $scope.settingsView.afl_time.setTime(notifications.data);
        });
      }else{
        $scope.settingsView.afl_time = new Date();
        $scope.settingsView.afl_time.setHours(16,0,0,0);
      }
      $scope.settingsView.afl = present;
  });

  cordova.plugins.notification.local.isPresent(5, function (present) {
      if(present){
        cordova.plugins.notification.local.get(5, function (notifications) {
          $scope.settingsView.d_time = new Date();
          $scope.settingsView.d_time.setTime(notifications.data);
        });
      }else{
        $scope.settingsView.d_time = new Date();
        $scope.settingsView.d_time.setHours(19,0,0,0);
      }
      $scope.settingsView.d = present;
  });

  $scope.settingsView.setBFNotification = function() {
    if($scope.settingsView.bf == false){
      cordova.plugins.notification.local.cancel(1, function(){});
    }else{
      var time = $scope.settingsView.now;
      time.setHours($scope.settingsView.bf_time.getHours(),$scope.settingsView.bf_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 1,
        text: "Breakfast",
        at: time,
        every: "day",
        data: time.getTime()
      });
    }
  }

  $scope.settingsView.setMMLNotification = function() {
    if($scope.settingsView.mml == false){
      cordova.plugins.notification.local.cancel(2, function(){});
    }else{
      var time = $scope.settingsView.now;
      time.setHours($scope.settingsView.mml_time.getHours(),$scope.settingsView.mml_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 2,
        text: "Middle morning",
        at: time,
        every: "day",
        data: time.getTime()
      });
    }
  }

  $scope.settingsView.setLNotification = function() {
    if($scope.settingsView.l == false){
      cordova.plugins.notification.local.cancel(3, function(){});
    }else{
      var time = $scope.settingsView.now;
      time.setHours($scope.settingsView.l_time.getHours(),$scope.settingsView.l_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 3,
        text: "Lunch",
        at: time,
        every: "day",
        data: time.getTime()
      });
    }
  }

  $scope.settingsView.setAFLNotification = function() {
    if($scope.settingsView.afl == false){
      cordova.plugins.notification.local.cancel(4, function(){});
    }else{
      var time = $scope.settingsView.now;
      time.setHours($scope.settingsView.afl_time.getHours(),$scope.settingsView.afl_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 4,
        text: "Afternoon",
        at: time,
        every: "day",
        data: time.getTime()
      });
    }
  }

  $scope.settingsView.setDNotification = function() {
    if($scope.settingsView.d == false){
      cordova.plugins.notification.local.cancel(5, function(){});
    }else{
      var time = $scope.settingsView.now;
      time.setHours($scope.settingsView.d_time.getHours(),$scope.settingsView.d_time.getMinutes(),0,0);
      if(time.getTime() < new Date().getTime())
        time = new Date(time.getTime()+(24*60*60*1000));
      cordova.plugins.notification.local.schedule({
        id: 5,
        text: "Dinner",
        at: time,
        every: "day",
        data: time.getTime()
      });
    }
  }

  $scope.settingsView.setNotifications = function() {
    $scope.settingsView.setBFNotification();
    $scope.settingsView.setMMLNotification();
    $scope.settingsView.setLNotification();
    $scope.settingsView.setAFLNotification();
    $scope.settingsView.setDNotification();
    toastr.success("Notifications set!");
  }

}]);
