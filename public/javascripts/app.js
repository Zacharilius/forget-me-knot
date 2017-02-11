(function() {
    'use strict';

    var app = angular.module('forgetMeKnotApp', ['ngAnimate']);

    app.controller('myController', function($scope, $http) {
        $scope.showAddReminderSlideDown = false;
        $scope.newReminder = {"title": "Call my Mom", "remindEveryDays": 7};

        $scope.reminders = [];

        $scope.showAddReminder = function() {
            $scope.showAddReminderSlideDown = true;
        }

        $scope.hideAddReminder = function() {
            $scope.showAddReminderSlideDown = false;

        }

        $scope.createNewReminder = function() {
            $scope.reminders.push($scope.newReminder);
            $http.post('/api/reminders', $scope.reminders).
                then(function onSuccess(response) {
                    var data = response.data;
                    $scope.reminders = data;
                    $scope.hideAddReminder();
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        $scope.updateReminders = function() {
            $http.post('/api/reminders', $scope.reminders).
                then(function onSuccess(response) {
                    var data = response.data;
                    $scope.reminders = data;
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        $scope.deleteReminder = function($index, reminder) {
            $scope.reminders.splice($index, 1);
            $scope.$emit('reminderDeleted', reminder);

            $http.delete('/api/reminders/' + reminder.id).
                then(function onSuccess(response) {
                    /* Nothing */
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        function init() {
            $http.get('/api/reminders').
                then(function onSuccess(response) {
                    var data = response.data;
                    $scope.reminders = data;
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        init();
    });

})();

