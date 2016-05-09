app.controller('registersChartsController', ['$scope','$filter','DBService','toastr', function ($scope,$filter,DBService,toastr) {
  $scope.chartView = {};
  $scope.chartView.actualDate = new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
  $scope.chartView.actualDate.setHours(0,0,0,0);
  $scope.chartView.yesterday = new Date($scope.chartView.actualDate.getTime()-86400000);
  $scope.chartView.TwoMonthsAgo = new Date($scope.chartView.actualDate.getTime()-5184000000);
  $scope.chart = {};

  DBService.getLastThirtyRegisters().then(function(res){
    if(res != "NO REGISTERS FOUND"){
      var BF = [];
      var MML = [];
      var L = [];
      var AFL = [];
      var D = [];
      var RD = [];
      for(i = res.length-1;i >= 0; i--){
        RD.push($filter('date')((res[i].REGISTERDAY), 'yyyy/MM/dd'));
        BF.push(res[i].BREAKFAST_VALUE);
        MML.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
        L.push(res[i].LUNCH_VALUE);
        AFL.push(res[i].AFTERNOONLUNCH_VALUE);
        D.push(res[i].DINNER_VALUE);
      }
      $scope.chartView.chart = {
        labels : RD,
        series : ['BF','MML','L','AFL','D'],
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
              for(i = res.length-1;i >= 0; i--){
                RD.push($filter('date')((res[i].REGISTERDAY), 'yyyy/MM/dd'));
                BF.push(res[i].BREAKFAST_VALUE);
                MML.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
                L.push(res[i].LUNCH_VALUE);
                AFL.push(res[i].AFTERNOONLUNCH_VALUE);
                D.push(res[i].DINNER_VALUE);
              }
              $scope.chartView.chart = {
                labels : RD,
                series : ['BF','MML','L','AFL','D'],
                data : [BF,MML,L,AFL,D]
              };
          }
      },function(error){
          toastr.error(error);
      });
  }

}]);
