'use strict';

angular.module('forzaLeagueApp')
  .controller('MainCtrl', function ($scope, driverService) {
    var driver, drivers;

    $scope.standings = [];

    drivers = driverService.getDrivers();

    for (driver in drivers) {
      $scope.standings.push(driverService.getDriverWithStats(drivers[driver].id));
    }

    driverService.getTeamStandings().then(function(data) {
      $scope.teamStandings = data;
    });
  });
