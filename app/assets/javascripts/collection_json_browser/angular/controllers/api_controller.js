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

    if(successHandler === undefined)
      successHandler = responseHandler

    $http.get(url).success(function(data, status){
      successHandler(data, status)
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
    $scope.itemPaths = [{ name: "-- None (POST create) --", value: ''}]
    if(items)
      items.forEach(function(i){
        $scope.itemPaths.push({name: i.href, value: i.href})
      })
    $scope.item = ""

    $scope.status = status
    $scope.loading = false
  }

  function getTemplate(item) {
    if(item === undefined || item == '') {
      //TODO
      //empty fields
      //post
    } else {
      get(item, setTemplate)
      //TODO
      //put
    }
  }

  function setTemplate(data){
    if(data.collection.template) {
      $scope.template = data.collection.template.data
    }
  }
}

ApiController.$inject = ['$scope', '$http', '$location'];
