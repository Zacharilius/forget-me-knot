(function() {

  angular
    .module('forgetMeKnotApp')
    .service('fmkData', fmkData);

  fmkData.$inject = ['$http', 'authentication'];
  function fmkData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();
