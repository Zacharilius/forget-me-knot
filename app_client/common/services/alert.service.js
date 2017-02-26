(function() {
  'use strict';

  angular
    .module('forgetMeKnotApp')
    .service('fmkAlert', fmkAlert);

  fmkAlert.$inject = ['$rootScope', '$timeout'];
  function fmkAlert ($rootScope, $timeout) {

    $rootScope.showSuccess = false;
    $rootScope.successMessage = '';
    var showSuccessAlert = function (message) {
      $rootScope.showSuccess = true;
      $rootScope.successMessage = message;
      $timeout(function(){
        $rootScope.showSuccess = false;
      }, 5000);
    };

    $rootScope.showError = false;
    $rootScope.errorMessage = '';
    var showErrorAlert = function (message) {
      $rootScope.showError = true;
      $rootScope.errorMessage = message;
      $timeout(function(){
        $rootScope.showError = false;
      }, 5000);
    };

    return {
      showSuccessAlert : showSuccessAlert,
      showErrorAlert : showErrorAlert
    };
  }
})();
