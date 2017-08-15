app.controller('registersChartsController', ['$scope','$filter','DBService','toastr','$window','$uibModal', function ($scope,$filter,DBService,toastr,$window,$uibModal) {
  window.scrollTo(0, 0);
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
  $scope.chartView.bt = true;
  $scope.chartView.colours = [{
      fillColor: 'rgba(151,187,205,0.0)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,0.8)'},
      {
      fillColor: 'rgba(220,220,220,0.0)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,0.8)'},
      {
      fillColor: 'rgba(247,70,74,0.0)',
      strokeColor: 'rgba(247,70,74,1)',
      pointColor: 'rgba(247,70,74,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(247,70,74,0.8)'},
      {
      fillColor: 'rgba(70,191,189,0.0)',
      strokeColor: 'rgba(70,191,189,1)',
      pointColor: 'rgba(70,191,189,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(70,191,189,0.8)'},
      {
      fillColor: 'rgba(253,180,92,0.0)',
      strokeColor: 'rgba(253,180,92,1)',
      pointColor: 'rgba(253,180,92,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(253,180,92,0.8)'},
      {
      fillColor: 'rgba(77,83,96,0.0)',
      strokeColor: 'rgba(77,83,96,1)',
      pointColor: 'rgba(77,83,96,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(77,83,96,0.8)'}
    ];
  $scope.chartView.chart = {};
  $scope.chartView.line = {};
  $scope.chartView.polar = {};
  $scope.chartView.options = {
    animation : false,
  }

  DBService.getLastTenRegisters().then(function(res){
    if(res != "NO REGISTERS FOUND"){
      var BF = [];
      var MML = [];
      var L = [];
      var AFL = [];
      var D = [];
      var BT = [];
      var RD = [];
      for(i = res.length-1;i >= 0; i--){
        RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy'));
        BF.push(res[i].BREAKFAST_VALUE);
        MML.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
        L.push(res[i].LUNCH_VALUE);
        AFL.push(res[i].AFTERNOONLUNCH_VALUE);
        D.push(res[i].DINNER_VALUE);
        BT.push(res[i].BEDTIME_VALUE);
      }
      $scope.chartView.chart = {
        labels : RD,
        series : ['Break Fast','Middle Morning','Lunch','Afternoon','Dinner','Bedtime'],
        data : [BF,MML,L,AFL,D,BT]
      };
      var DT2 = [];
      var RD2 = [];
      for(i = res.length-8;i >= 0; i--){
        if(res[i].BREAKFAST_VALUE != 0){
          RD2.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].BREAKFAST_TIME), 'HH:mm'));
          DT2.push(res[i].BREAKFAST_VALUE);
        }
        if(res[i].MIDDLEMORNINGLUNCH_VALUE != 0){
          RD2.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].MIDDLEMORNINGLUNCH_TIME), 'HH:mm'));
          DT2.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
        }
        if(res[i].LUNCH_VALUE != 0){
          RD2.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].LUNCH_TIME), 'HH:mm'));
          DT2.push(res[i].LUNCH_VALUE);
        }
        if(res[i].AFTERNOONLUNCH_VALUE != 0){
          RD2.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].AFTERNOONLUNCH_TIME), 'HH:mm'));
          DT2.push(res[i].AFTERNOONLUNCH_VALUE);
        }
        if(res[i].DINNER_VALUE != 0){
          RD2.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].DINNER_TIME), 'HH:mm'));
          DT2.push(res[i].DINNER_VALUE);
        }
        if(res[i].BEDTIME_VALUE != 0){
          RD2.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].BEDTIME_TIME), 'HH:mm'));
          DT2.push(res[i].BEDTIME_VALUE);
        }
      }
      $scope.chartView.line = {
        labels : RD2,
        series : ['Value '],
        data : [DT2]
      };
      $scope.chartView.onClick = function (points, evt) {
        console.log(points, evt);
      };
    }
  },function(error){
      toastr.error(error);
  });

  DBService.getRegister($scope.chartView.actualDate.getTime()).then(function(res){
      if(res == "NO REGISTERS FOUND"){
          toastr.error("NO REGISTERS FOUND");
      }else{
        $scope.chartView.polar = {
          labels : ['Break Fast','Middle Morning','Lunch','Afternoon','Dinner','Bedtime'],
          data : [res[0].BREAKFAST_VALUE,res[0].MIDDLEMORNINGLUNCH_VALUE,res[0].LUNCH_VALUE,res[0].AFTERNOONLUNCH_VALUE,res[0].DINNER_VALUE,res[0].BEDTIME_VALUE]
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
              var BT = [];
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
              if($scope.chartView.bt == true)
                S.push('Bedtime');
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
                if($scope.chartView.bt == true)
                  BT.push(res[i].BEDTIME_VALUE);
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
              if($scope.chartView.bt == true)
                dt.push(BT);
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
            labels : ['Break Fast','Middle Morning','Lunch','Afternoon','Dinner','Bedtime'],
            data : [res[0].BREAKFAST_VALUE,res[0].MIDDLEMORNINGLUNCH_VALUE,res[0].LUNCH_VALUE,res[0].AFTERNOONLUNCH_VALUE,res[0].DINNER_VALUE,res[0].BEDTIME_VALUE]
          };
        }
    },function(error){
        toastr.error(error);
    });
  }

  $scope.getGlicemicLine = function(){
      var start = $scope.chartView.startDate2.getTime();
      var end = $scope.chartView.endDate2.getTime();
      DBService.getRangeOfRegisters(start,end).then(function(res){
          if(res == "NO REGISTERS FOUND"){
              toastr.error("NO REGISTERS FOUND");
              //$scope.chartView.registerArrays = [];
          }else{
              var DT = [];
              var RD = [];
              for(i = res.length-1;i >= 0; i--){
                if(res[i].BREAKFAST_VALUE != 0){
                  RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].BREAKFAST_TIME), 'HH:mm'));
                  DT.push(res[i].BREAKFAST_VALUE);
                }
                if(res[i].MIDDLEMORNINGLUNCH_VALUE != 0){
                  RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].MIDDLEMORNINGLUNCH_TIME), 'HH:mm'));
                  DT.push(res[i].MIDDLEMORNINGLUNCH_VALUE);
                }
                if(res[i].LUNCH_VALUE != 0){
                  RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].LUNCH_TIME), 'HH:mm'));
                  DT.push(res[i].LUNCH_VALUE);
                }
                if(res[i].AFTERNOONLUNCH_VALUE != 0){
                  RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].AFTERNOONLUNCH_TIME), 'HH:mm'));
                  DT.push(res[i].AFTERNOONLUNCH_VALUE);
                }
                if(res[i].DINNER_VALUE != 0){
                  RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].DINNER_TIME), 'HH:mm'));
                  DT.push(res[i].DINNER_VALUE);
                }
                if(res[i].BEDTIME_VALUE != 0){
                  RD.push($filter('date')((res[i].REGISTERDAY), 'dd/MM/yyyy') + ' - ' + $filter('date')((res[i].BEDTIME_TIME), 'HH:mm'));
                  DT.push(res[i].BEDTIME_VALUE);
                }
              }
              $scope.chartView.line = {
                labels : RD,
                series : ['Value '],
                data : [DT]
              };
          }
      },function(error){
          toastr.error(error);
      });
  }
  // $scope.getRangeImg = function(){
  //   var doc = new jsPDF('p', 'pt');
  //   var url = document.getElementById('line').toDataURL("image/jpeg");
  //   url = url.replace(/^data:image\/(png|jpg);base64,/, "");
  //   doc.addImage(url, 'JPEG', 15, 40, 180, 100);
  //   console.log(url);
  //   window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function(fileSystem) {
  //    fileSystem.getFile("rangeImg.pdf", {create: true}, function(entry) {
  //       var fileEntry = entry;
  //       entry.createWriter(function(writer) {
  //          writer.write( doc.output());
  //       }, function(error) {
  //          console.log(error);
  //       });
  //    }, function(error){
  //       console.log(error);
  //    });
  //    $window.open(cordova.file.externalCacheDirectory+"/rangeImg.pdf","_system",'location=no');
  //   },
  //   function(event){
  //     console.log( evt.target.error.code );
  //   });
  // }

  $scope.helpIcon = function(){

          var ModalInstanceCtrl = function ($scope, $uibModalInstance, data) {
                        $scope.data = data;
                        $scope.close = function(/*result*/){
                          $uibModalInstance.close($scope.data);
                        };
                      };

          var data = {
                          boldTextTitle: "Charts",
                          textAlert : "There is three charts available for use, the Multiple days chart" +
                                      " provide a chart with multiple lines representing the periods of multiple days" +
                                      " contained inside the selected range, the Specific day chart provide a polar area chart, with each section of the chart representing a period of the day," +
                                      " and the glicemic line provide a continuous line of the registers contained on the selected period.",
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
