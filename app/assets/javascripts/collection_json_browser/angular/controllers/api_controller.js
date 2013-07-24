'use strict';

function ApiController($scope, $http, $location) {
  $scope.goTo = function(url, fromRel) {
    $scope.fromRel = fromRel
    $location.url(url)
  }

  $scope.submit = function() {
    $scope.fromRel === 'edit-form' ? put() : post()
  }

  $scope.$watch(function() {
    return $location.url()
  }, function(url, oldUrl) {
    if(url !== oldUrl) {
      get(url)
    }
  });

  get('/api')

  // helpers

  function get(url) {
    $scope.loading = true
    $http.get(url).success(responseHandler).error(function(){ $scope.loading = false })
  }

  function post() {
    $scope.loading = true
    $http.post($scope.collection.href, formData()).
      success(responseHandler).
      error(responseHandler)
  }

  function put() {
    $scope.loading = true
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
    $scope.loading = false

    var collectionHref = $scope.collection.href
    if(collectionHref !== $location.path() && collectionHref.match(/^http/) === null) {
      $location.url(collectionHref)
    }
  }
}


ApiController.$inject = ['$scope', '$http', '$location'];
