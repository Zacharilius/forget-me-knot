(function () {

  angular
    .module('forgetMeKnotApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          console.log(err); /* TODO: Display error */
        })
        .then(function(){
          $location.path('profile');
        });
    };
  }
})();
