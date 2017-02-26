(function() {

  angular
    .module('forgetMeKnotApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', '$http', 'fmkData', 'fmkAlert', 'authentication'];

  function profileCtrl($location, $http, fmkData, fmkAlert, authentication) {
    var vm = this;

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

    /* Reminders */
    vm.reminders = [];
    vm.showAddReminderSlideDown = false;
    vm.newReminder = {"title": "Call my Mom", "remindEveryDays": 7};

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
