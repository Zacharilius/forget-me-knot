(function() {

  angular
    .module('forgetMeKnotApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'fmkData'];
  function profileCtrl($location, fmkData) {
    var vm = this;

    vm.user = {};

    fmkData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();
