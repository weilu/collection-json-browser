'use strict';

function ApiController($scope, $http, $location) {
  $scope.goTo = function(path, fromRel) {
    $scope.fromRel = fromRel
    $location.path(path)
  }

  $scope.submit = function() {
    $scope.fromRel === 'edit-form' ? put() : post()
  }

  $scope.$watch(function() {
    return $location.path()
  }, function(path, oldPath) {
    if(path !== oldPath) get(path)
  });

  get('/api')

  // helpers

  function get(path) {
    $http.get(path).success(responseHandler)
  }

  function post() {
    $http.post($scope.collection.href, formData()).
      success(responseHandler).
      error(responseHandler)
  }

  function put() {
    $http.put($scope.collection.href, formData()).
      success(responseHandler).
      error(responseHandler)
  }

  function formData() {
    var data = {};
    $scope.collection.template.data.forEach(function(f){ data[f.name] = f.value })
    return data
  }

  function responseHandler(data, status) {
    $scope.collection = data.collection;
    $scope.raw = JSON.stringify(data, undefined, 2)
    $scope.status = status

    $location.path($scope.collection.href)
  }
}


ApiController.$inject = ['$scope', '$http', '$location'];
