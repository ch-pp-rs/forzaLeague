'use strict';

angular.module('forzaLeagueApp')
  .controller('DriverCtrl', function ($scope, $routeParams, driverService) {
    $scope.driver = driverService.getDriverWithStats($routeParams.id);
  });
