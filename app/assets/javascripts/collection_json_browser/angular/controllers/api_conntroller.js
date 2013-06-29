'use strict';

function ApiController($scope, $http, $location) {
  delete $http.defaults.headers.common['X-Requested-With']

  console.log('in controller')

  $scope.get = function(path){
    $http.get(path).success(function(data) {
      $scope.collection = data.collection;
      $scope.raw = JSON.stringify(data, undefined, 2)

      $location.path(path)
    })
  }

  $scope.$watch(function() {
    return $location.path()
  }, function(path) {
    $scope.get(path)
  });

  $scope.get('/api')
}

ApiController.$inject = ['$scope', '$http', '$location'];
