'use strict';

function ItemController($scope, $http, $location) {
  var links = $scope.item.links
  $scope.assignImagesAndLinks(links)
}

ItemController.$inject = ['$scope', '$http', '$location'];
