app.controller('registersListController', ['$scope','$filter','DBService', function ($scope,$filter,DBService) {
    $scope.actualDate = new Date();//$filter('date')((new Date()), 'yyyy/MM/dd');
    $scope.startDate = null;
    $scope.SM = null;
    $scope.SR = false;
    $scope.SD = false;
    $scope.$watch('SM', function(newValue, oldValue) {
      if(newValue == 'R'){
        $scope.SR = true;
        $scope.SD = false;
      }else if(newValue){
        $scope.SR = false;
        $scope.SD = true;
      }
    });
    $scope.$watch('startDate', function(newValue, oldValue) {
          if(newValue == null){
            $scope.endDate = null;
          }
    });
}]);