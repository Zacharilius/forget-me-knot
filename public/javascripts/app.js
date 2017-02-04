var app = angular.module('forgetMeKnotApp',[]);

app.controller('myController', function($scope, $http) {
    $scope.reminders = [];
    var request = $http.get('/data');
    request.success(function(data) {
        $scope.reminders = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
});
