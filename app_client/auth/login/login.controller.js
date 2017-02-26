(function () {

  angular
    .module('forgetMeKnotApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'fmkAlert', 'authentication'];
  function loginCtrl($location, fmkAlert, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        .error(function(err){
          fmkAlert.showErrorAlert(err.message);
        })
        .then(function(){
          $location.path('profile');
        });
    };
  }
})();
