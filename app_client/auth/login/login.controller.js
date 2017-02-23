(function () {

  angular
  .module('forgetMeKnotApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        .error(function(err){
          console.log(err); /* TODO: Display error */
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();