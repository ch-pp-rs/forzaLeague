'use strict';

angular.module('forzaLeagueApp')
  .controller('MainCtrl', function ($scope, driverService, seasonReportService) {
    var driver, drivers;

    $scope.standings = [];
    drivers = driverService.getDrivers();

    for (driver in drivers) {
      $scope.standings.push(driverService.getDriverWithStats(drivers[driver].id));
    }

    seasonReportService.getHistoricSeason(1).then(function(data) {
      console.log(data);
    });
  });
