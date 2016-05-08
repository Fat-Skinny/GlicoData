app.controller('registersChartsController', ['$scope','$filter','DBService','toastr', function ($scope,$filter,DBService,toastr) {
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
      $scope.chart = {
        labels : RD,
        series : ['BF','MML','L','AFL','D'],
        data : [BF,MML,L,AFL,D]
      };
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
    }else{
      DBService.setFloatingArray([]);
    }
  },function(error){
      toastr.error(error);
  });

}]);
