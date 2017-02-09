var app = angular.module('forgetMeKnotApp', ['ngAnimate']);

app.controller('myController', function($scope, $http) {
    $scope.showAddReminderSlideDown = false;
    $scope.newReminder = {"title": "Call my Mom", "remindEveryDays": 7};

    $scope.reminders = [];

    $scope.toggleAddReminder = function() {
        $scope.showAddReminderSlideDown = !$scope.showAddReminderSlideDown;
    }

    $scope.addReminder = function() {
        $scope.reminders.push($scope.newReminder);
        var request = $http.post('/api/reminders', $scope.reminders);
        request.success(function(data) {
            $scope.reminders = data;
            $scope.toggleAddReminder();
            console.log($scope.reminders.length);
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });
    }

    $scope.updateReminders = function() {
        var request = $http.post('/api/reminders', $scope.reminders);
        request.success(function(data) {
            $scope.reminders = data;
            console.log($scope.reminders.length);
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });
    }

    $scope.deleteReminder = function($index, reminder) {
        $scope.reminders.splice($index, 1);
        $scope.$emit('reminderDeleted', reminder);

        var request = $http.delete('/api/reminders/' + reminder.id);
        request.success(function(data) {
            /* Nothing */
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });
    }

    function init() {
        var request = $http.get('/api/reminders');
        request.success(function(data) {
            $scope.reminders = data;
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });
    }

    init();
});
