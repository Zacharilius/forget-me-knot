var app = angular.module('forgetMeKnotApp', ['ngAnimate']);

app.controller('myController', function($scope, $http) {
    $scope.reminders = [];

    $scope.addReminder = function() {
        var reminder = {"title": "", "startReminderTime": "", "lastReminderTime": "", "remindEveryDays": 1};
        $scope.reminders.unshift(reminder);
    }

    $scope.updateReminders = function() {
        var request = $http.post('/api/reminders', $scope.reminders);
        request.success(function(data) {
            $scope.reminders = data;
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
            console.log(data);
            console.log('delete');
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
