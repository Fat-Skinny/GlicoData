app.controller('indexController', ['$state','$scope','DBService', function ($state,$scope,DBService) {
    DBService.createTables();

    $scope.goToRM = function(){
        $state.go('rl');
    };
}]);