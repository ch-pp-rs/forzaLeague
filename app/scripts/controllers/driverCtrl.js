'use strict';

angular.module('forzaLeagueApp')
  .controller('DriverCtrl', function ($scope, $routeParams, driverService, trackService) {
    $scope.driver = driverService.getDriverWithStats($routeParams.id);
    $scope.tracks = trackService.getTracks();
  });
