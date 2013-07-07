'use strict';

function ApiController($scope, $http, $location) {

  $scope.goTo = function(path) {
    $location.path(path)
  }

  $scope.post = function() {
    var formData = {};
    $scope.collection.template.data.forEach(function(f){ formData[f.name] = f.value })
    $http.post($scope.collection.href, formData).success(successHandler)
  }

  $scope.$watch(function() {
    return $location.path()
  }, function(path, oldPath) {
    if(path !== oldPath) get(path)
  });

  $scope.assignImagesAndLinks = function(links){
    if(links) {
      $scope.images = links.filter(function(link){
        return link.render === 'image'
      })
      $scope.links = links.filter(function(link){
        return link.render !== 'image'
      })
    } else {
      $scope.images = undefined
      $scope.links = undefined
    }
  }

  get('/api')

  // helpers

  function get(path) {
    $http.get(path).success(successHandler)
  }

  function successHandler(data, status) {
    var links = data.collection.links
    $scope.assignImagesAndLinks(links)

    $scope.collection = data.collection;
    $scope.raw = JSON.stringify(data, undefined, 2)
    $scope.status = status

    $location.path($scope.collection.href)
  }
}


ApiController.$inject = ['$scope', '$http', '$location'];
