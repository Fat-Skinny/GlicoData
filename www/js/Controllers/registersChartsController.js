app.controller('registersChartsController', ['$scope','$filter','DBService','toastr', function ($scope,$filter,DBService,toastr) {
  $scope.chartView = {};
  $scope.chartView.actualDate = new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
  $scope.chartView.actualDate.setHours(0,0,0,0);
  $scope.chartView.yesterday = new Date($scope.chartView.actualDate.getTime()-86400000);
  $scope.chartView.TwoMonthsAgo = new Date($scope.chartView.actualDate.getTime()-5184000000);
  $scope.chartView.specificDate =  $scope.chartView.actualDate;
  $scope.chartView.SC = 'LC';
  $scope.chartView.bf = true;
  $scope.chartView.mml = true;
  $scope.chartView.l = true;
  $scope.chartView.afl = true;
  $scope.chartView.d = true;
  $scope.chartView.chart = {};
  $scope.chartView.polar = {};

  DBService.getLastTenRegisters().then(function(res){
    if(res != "NO REGISTERS FOUND"){
      var BF = [];
      var MML = [];
      var L = [];
      var AFL = [];
      var D = [];
      var RD = [];
      for(i = res.length-1;i >= 0; i--){
        RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy'));
        BF.push(res[i].BREAKFAST_VALUE);
        MML.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
        L.push(res[i].LUNCH_VALUE);
        AFL.push(res[i].AFTERNOONLUNCH_VALUE);
        D.push(res[i].DINNER_VALUE);
      }
      $scope.chartView.chart = {
        labels : RD,
        series : ['Break Fast','Middle Morning','Lunch','Afternoon','Dinner'],
        data : [BF,MML,L,AFL,D]
      };
      $scope.chartView.onClick = function (points, evt) {
        console.log(points, evt);
      };
    }else{
      DBService.setFloatingArray([]);
    }
  },function(error){
      toastr.error(error);
  });

  DBService.getRegister($scope.chartView.actualDate.getTime()).then(function(res){
      if(res == "NO REGISTERS FOUND"){
          toastr.error("NO REGISTERS FOUND");
      }else{
        $scope.chartView.polar = {
          labels : ['Break Fast','Middle Morning','Lunch','Afternoon','Dinner'],
          data : [res[0].BREAKFAST_VALUE,res[0].MIDDLEMORNINGLUNCH_VALUE,res[0].LUNCH_VALUE,res[0].AFTERNOONLUNCH_VALUE,res[0].DINNER_VALUE]
        };
      }
  },function(error){
      toastr.error(error);
  });

  DBService.getFirstRegisterDate().then(function(res){
      if(res == $scope.chartView.actualDate.getTime()){
          $scope.chartView.firstRegisterDate = new Date(res - 24*60*60*1000*2);
      }else{
          $scope.chartView.firstRegisterDate = new Date(res);
      }
  },function(error){
      $scope.chartView.firstRegisterDate = new Date($scope.listView.actualDate.getTime()-5184000000);
  });

  $scope.getChartOfRegisters = function(){
      var start = $scope.chartView.startDate.getTime();
      var end = $scope.chartView.endDate.getTime();
      DBService.getRangeOfRegisters(start,end).then(function(res){
          if(res == "NO REGISTERS FOUND"){
              toastr.error("NO REGISTERS FOUND");
              //$scope.chartView.registerArrays = [];
          }else{
              var BF = [];
              var MML = [];
              var L = [];
              var AFL = [];
              var D = [];
              var RD = [];
              var S = [];
              if($scope.chartView.bf == true)
                S.push('Break Fast');
              if($scope.chartView.mml == true)
                S.push('Middle Morning');
              if($scope.chartView.l == true)
                S.push('Lunch');
              if($scope.chartView.afl == true)
                S.push('Afternoon');
              if($scope.chartView.d == true)
                S.push('Dinner');
              for(i = res.length-1;i >= 0; i--){
                RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy'));
                if($scope.chartView.bf == true)
                  BF.push(res[i].BREAKFAST_VALUE);
                if($scope.chartView.mml == true)
                  MML.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
                if($scope.chartView.l == true)
                  L.push(res[i].LUNCH_VALUE);
                if($scope.chartView.afl == true)
                  AFL.push(res[i].AFTERNOONLUNCH_VALUE);
                if($scope.chartView.d == true)
                  D.push(res[i].DINNER_VALUE);
              }
              var dt = [];
              if($scope.chartView.bf == true)
                dt.push(BF);
              if($scope.chartView.mml == true)
                dt.push(MML);
              if($scope.chartView.l == true)
                dt.push(L);
              if($scope.chartView.afl == true)
                dt.push(AFL);
              if($scope.chartView.d == true)
                dt.push(D);
              $scope.chartView.chart = {
                labels : RD,
                series : S,
                data : dt
              };
          }
      },function(error){
          toastr.error(error);
      });
  }

  $scope.getChartOfRegister = function() {
    var registerDate = $scope.chartView.specificDate.getTime();
    DBService.getRegister(registerDate).then(function(res){
        if(res == "NO REGISTERS FOUND"){
            toastr.error("NO REGISTERS FOUND");
        }else{
          $scope.chartView.polar = {
            labels : ['Break Fast','Middle Morning','Lunch','Afternoon','Dinner'],
            data : [res[0].BREAKFAST_VALUE,res[0].MIDDLEMORNINGLUNCH_VALUE,res[0].LUNCH_VALUE,res[0].AFTERNOONLUNCH_VALUE,res[0].DINNER_VALUE]
          };
        }
    },function(error){
        toastr.error(error);
    });
  }

}]);
