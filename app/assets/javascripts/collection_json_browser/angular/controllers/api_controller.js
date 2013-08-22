'use strict';

function ApiController($scope, $http, $location) {
  $scope.rootUrl = '/api'

  $scope.goTo = function(url, fromRel) {
    $scope.fromRel = fromRel
    get(url)
  }

  $scope.submit = function() {
    $scope.fromRel === 'edit-form' ? put() : post()
  }

  $scope.destroy = destroy

  $scope.$watch(function() {
    return $location.url();
  }, function(url, oldUrl) {
    if(url !== oldUrl)
      get(url)
  });

  get($scope.rootUrl)

  // helpers

  function get(url) {
    $scope.loading = true
    $http.get(url).success(function(data, status){
      responseHandler(data, status)
      $location.url(url)
    }).error(responseHandler)
  }

  function destroy(url) {
    $scope.loading = true
    $http.delete(url).
      success(responseHandler).
      error(responseHandler)
  }

  function post() {
    $scope.loading = true
    $http.post($scope.collection.href, formData()).
      success(responseHandler).
      error(responseHandler)
  }

  function put() {
    $scope.loading = true
    $http.put($location.url(), formData()).
      success(responseHandler).
      error(responseHandler)
  }

  function formData() {
    var data = {};
    $scope.collection.template.data.forEach(function(f) {
      data[f.name] = f.value
    })
    return data
  }

  function responseHandler(data, status) {
    $scope.collection = data.collection;
    $scope.raw = JSON.stringify(data, undefined, 2)

    var items = data.collection.items
    $scope.itemPaths = [{ name: "-- None (POST create) --", value: ''}]
    if(items)
      items.forEach(function(i){
        $scope.itemPaths.push({name: i.href, value: i.href})
      })
    $scope.item = ""

    $scope.status = status
    $scope.loading = false
  }
}

ApiController.$inject = ['$scope', '$http', '$location'];
