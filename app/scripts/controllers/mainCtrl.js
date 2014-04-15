'use strict';

angular.module('forzaLeagueApp')
  .controller('MainCtrl', function ($scope, raceReportService, driverService) {
    var race,
        points = [10, 8, 6, 4, 2, 1, 0];

    $scope.standings = driverService.getDrivers();
    for (var driver in $scope.standings) {
      $scope.standings[driver].points = 0;
      $scope.standings[driver].wins = 0;
      $scope.standings[driver].podiums = 0;
      $scope.standings[driver].fastestLaps = 0;
    }

    $scope.raceReports = raceReportService.getRaceReports();

    $scope.raceReports.$on('loaded', function(raceReports) {
      for (var raceReport in raceReports) {
        race = raceReports[raceReport];

        for (var result in race.result) {
          if ($scope.standings[race.result[result].driver.id]) {
            $scope.standings[race.result[result].driver.id].points =
                $scope.standings[race.result[result].driver.id].points + points[result];

            if (parseInt(result) === 0) {
              $scope.standings[race.result[result].driver.id].wins =
                $scope.standings[race.result[result].driver.id].wins + 1;
            }

			      if (parseInt(result) <= 2) {
              $scope.standings[race.result[result].driver.id].podiums =
                $scope.standings[race.result[result].driver.id].podiums + 1;
            }
          }
        }
        $scope.standings[race.fastestLapDriver.id].fastestLaps =
            $scope.standings[race.fastestLapDriver.id].fastestLaps + 1;
      }
    });
  });
