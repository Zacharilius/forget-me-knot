(function() {

  angular
    .module('forgetMeKnotApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', '$http', 'fmkData', 'fmkAlert', 'authentication'];

  function profileCtrl($location, $http, fmkData, fmkAlert, authentication) {
    var vm = this;

    /* ====================================================================== */
    /* User */

    vm.user = {};

    fmkData.getProfile()
      .success(function(data) {
        vm.user = data.user;
        vm.reminders = data.reminders;
      })
      .error(function (e) {
        console.error(e);
      });

    /* ====================================================================== */
    /* Email Verification */

    vm.verifyEmailCode = function() {
      $http.post('/api/user/verify-email', vm.user.emailVerificationCodeInput, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      }).success(function(data) {
        vm.user.emailVerified = true;
        fmkAlert.showSuccessAlert('Successfully verified email.');
      }).error(function (err) {
        fmkAlert.showErrorAlert(err.message);
      });
    }

    /* ====================================================================== */
    /* Reminders */

    vm.reminders = [];

    /* ---------------------------------------------------------------------- */
    /* Add Reminder */

    vm.showAddReminderSlideDown = false;
    vm.newReminder = {"type": "add", "reminderType": "email", "title": "Call my Mom", "remindEveryDays": 7};

    vm.showAddReminder = function() {
      vm.showAddReminderSlideDown = true;
    }

    vm.hideAddReminder = function() {
      vm.showAddReminderSlideDown = false;
    }

    vm.createNewReminder = function() {
      $http.post('/api/reminders', vm.newReminder, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      }).success(function(data) {
        vm.reminders.push(data);
        vm.hideAddReminder();
      }).error(function (err) {
        fmkAlert.showErrorAlert(err.message);
      });
    };

    /* ---------------------------------------------------------------------- */
    /* Update Reminder */

    vm.showUpdateReminderSlideDown = false;
    vm.focusedUpdateReminder = {"type": "update"};

    vm.renderUpdateReminderSlideDown = function(reminder) {
      vm.clearActiveReminders();
      event.currentTarget.classList.add('fmk-is-active');
      vm.focusedUpdateReminder = reminder;
      vm.focusedUpdateReminder.type = 'update';
      vm.showUpdateReminderSlideDown = true;
      event.stopPropagation();
    }

    vm.hideUpdateReminder = function() {
      vm.showUpdateReminderSlideDown = false;
      vm.clearActiveReminders();
    }

    vm.clearActiveReminders = function() {
      var reminders = document.querySelectorAll('.fmk-reminder-container') ;
      for (var i = 0; i < reminders.length; i++) {
        var reminder = reminders[i];
        reminder.classList.remove('fmk-is-active');
      }
    }

    vm.updateReminder = function() {
      $http.post('/api/reminders', vm.focusedUpdateReminder, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      }).success(function(data) {
        vm.hideUpdateReminder();
      }).error(function (err) {
        fmkAlert.showErrorAlert(err.message);
      });
    };

    /* ---------------------------------------------------------------------- */
    /* Delete Reminder */

    vm.deleteReminder = function(reminder) {
      $http.delete('/api/reminders/' + reminder._id, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      }).success(function(data) {
        for (var i in vm.reminders) {
          var thisReminder = vm.reminders[i];
          if (thisReminder._id === reminder._id) {
            vm.reminders.splice(i, i + 1);
            break;
          }
        }
      }).error(function (err) {
        fmkAlert.showErrorAlert(err.message);
      });
    };
  }
})();
