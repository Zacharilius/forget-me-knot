(function () {

  angular
    .module('forgetMeKnotApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    }

    vm.currentUser = authentication.currentUser();

    vm.isCurrentPath = function (path) {
        return $location.path() == path;
    };
  }
})();
