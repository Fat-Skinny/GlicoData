app.controller('indexController', ['$state','$scope','DBService','toastr', function ($state,$scope,DBService,toastr) {
    DBService.createTables();

    $scope.goToRM = function(){
        $state.go('rl');
    };

    $scope.goToRC = function(){
        $state.go('rc');
    };
}]);
