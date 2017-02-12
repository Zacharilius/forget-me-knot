(function() {
    'use strict';

    angular
        .module('app')
        .controller('RemindersController', RemindersController);

    RemindersController.$inject = ['UserService', '$rootScope', '$http', 'FlashService'];
    function RemindersController(UserService, $rootScope, $http, FlashService) {
        var vm = this;

        vm.user = null;

        vm.showAddReminderSlideDown = false;
        vm.newReminder = {"title": "Call my Mom", "remindEveryDays": 7};

        vm.reminders = [];

        vm.showAddReminder = function() {
            vm.showAddReminderSlideDown = true;
        }

        vm.hideAddReminder = function() {
            vm.showAddReminderSlideDown = false;

        }

        vm.createNewReminder = function() {
            vm.reminders.push(vm.newReminder);
            $http.post('/api/reminders', vm.reminders).
                then(function onSuccess(response) {
                    var data = response.data;
                    vm.reminders = data;
                    vm.hideAddReminder();
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        vm.updateReminders = function() {
            $http.post('/api/reminders', vm.reminders).
                then(function onSuccess(response) {
                    var data = response.data;
                    vm.reminders = data;
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        vm.deleteReminder = function($index, reminder) {
            vm.reminders.splice($index, 1);
            vm.$emit('reminderDeleted', reminder);

            $http.delete('/api/reminders/' + reminder.id).
                then(function onSuccess(response) {
                    /* Nothing */
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        function initReminders() {
            $http.get('/api/reminders').
                then(function onSuccess(response) {
                    var data = response.data;
                    vm.reminders = data;
                }, function onError(response) {
                    var data = response.data;
                    console.error('Error: ' + data);
                });
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function initController() {
            loadCurrentUser();
            initReminders();
        }

        initController();
    }

})();



// (function() {
//     'use strict';

//     angular
//         .module('app', ['ngAnimate'])
//         .controller('RemindersController', RemindersController);

//     RemindersController.$inject = ['UserService', '$rootScope', 'FlashService'];
//     function RemindersController(UserService, $rootScope, FlashService) {
//         var vm = this;

//         vm.showAddReminderSlideDown = false;
//         vm.newReminder = {"title": "Call my Mom", "remindEveryDays": 7};

//         vm.reminders = [];

        // vm.showAddReminder = function() {
        //     vm.showAddReminderSlideDown = true;
        // }

        // vm.hideAddReminder = function() {
        //     vm.showAddReminderSlideDown = false;

        // }

        // vm.createNewReminder = function() {
        //     vm.reminders.push(vm.newReminder);
        //     $http.post('/api/reminders', vm.reminders).
        //         then(function onSuccess(response) {
        //             var data = response.data;
        //             vm.reminders = data;
        //             vm.hideAddReminder();
        //         }, function onError(response) {
        //             var data = response.data;
        //             console.error('Error: ' + data);
        //         });
        // }

        // vm.updateReminders = function() {
        //     $http.post('/api/reminders', vm.reminders).
        //         then(function onSuccess(response) {
        //             var data = response.data;
        //             vm.reminders = data;
        //         }, function onError(response) {
        //             var data = response.data;
        //             console.error('Error: ' + data);
        //         });
        // }

        // vm.deleteReminder = function($index, reminder) {
        //     vm.reminders.splice($index, 1);
        //     vm.$emit('reminderDeleted', reminder);

        //     $http.delete('/api/reminders/' + reminder.id).
        //         then(function onSuccess(response) {
        //             /* Nothing */
        //         }, function onError(response) {
        //             var data = response.data;
        //             console.error('Error: ' + data);
        //         });
        // }

        // function initController() {
        //     $http.get('/api/reminders').
        //         then(function onSuccess(response) {
        //             var data = response.data;
        //             vm.reminders = data;
        //         }, function onError(response) {
        //             var data = response.data;
        //             console.error('Error: ' + data);
        //         });
        // }

//         initController();
//     };

// })();
