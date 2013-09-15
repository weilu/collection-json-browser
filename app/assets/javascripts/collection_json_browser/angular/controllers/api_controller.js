'use strict';

function ApiController($scope, $http, $location) {
  $scope.rootUrl = '/api'

  $scope.goTo = function(url, fromRel) {
    $scope.fromRel = fromRel
    $location.url(url)
  }

  $scope.submit = function() {
    console.log('=============> ', $scope.item)
    $scope.item === $scope.collection.href ? post() : put()
  }

  $scope.destroy = destroy

  $scope.$watch(function() {
    return $location.url();
  }, function(url, oldUrl) {
    if(url !== oldUrl) { get(url) }
  });

  $scope.$watch(function() {
    return $scope.item;
  }, function(item, oldItem) {
    if(item != oldItem)
      getTemplate(item)
  });

  get($scope.rootUrl)

  // helpers

  function get(url, successHandler) {
    $scope.loading = true

    var updateUrl = false
    if(successHandler === undefined) {
      successHandler = responseHandler
      updateUrl = true
    }

    $http.get(url).success(function(data, status){
      successHandler(data, status)
      if(updateUrl) $location.url(url)
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
    $http.put($scope.collection.items[0].href, formData()).
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

    setTemplate(data)

    var items = data.collection.items
    $scope.itemPaths = [{ name: "-- None (POST create) --", value: data.collection.href}]
    if(items) {
      items.forEach(function(i){
        $scope.itemPaths.push({name: i.href, value: i.href})
      })
    }
    $scope.item = $scope.itemPaths[0].value

    $scope.status = status
    $scope.loading = false
  }

  function getTemplate(item) {
    if(item !== undefined) { get(item, setTemplate) }
    $scope.loading = false
  }

  function setTemplate(data){
    if(data.collection.template) {
      $scope.template = data.collection.template.data
    } else {
      $scope.template = undefined
    }

  }
}

ApiController.$inject = ['$scope', '$http', '$location'];
