'use strict';

angular.module('forzaLeagueApp')
  .service('driverService', function() {
    var drivers = [
      {
        'id': 0,
        'name': 'Ben Smith',
        'gamertag': 'guitarben'
      },
      {
        'id': 1,
        'name': 'Jason Jefferies',
        'gamertag': 'M1lhous3'
      },
      {
        'id': 2,
        'name': 'Ben Chaplin',
        'gamertag': 'AxelTron'
      },
      {
        'id': 3,
        'name': 'Ben Grimmwood',
        'gamertag': 'MysticTriEdge'
      },
      {
        'id': 4,
        'name': 'Thuin Kahn',
        'gamertag': 'SacredMr T'
      }
    ];

    this.getDrivers = function() {
      return drivers;
    };

  })
  .service('trackService', function($firebase) {
    this.getTracks = function(){
      return $firebase(new Firebase('https://forza.firebaseio.com/tracks'));
    };
  })
  .service('raceReportService', function($firebase) {
    var raceReportUrl = 'https://forza.firebaseio.com/raceReports/';

    this.getRaceReports = function() {
      return $firebase(new Firebase(raceReportUrl));
    };

    this.saveRaceReport = function(report) {
      var ref = new Firebase(raceReportUrl + report.date + '/');

      ref.update(angular.copy(report));
    };
  })
  .controller('MainCtrl', function ($scope, raceReportService, driverService) {
    var race,
        points = [10, 6, 4, 3, 2, 1];

    $scope.standings = driverService.getDrivers();
    for (var driver in $scope.standings) {
      $scope.standings[driver].points = 0;
      $scope.standings[driver].wins = 0;
      $scope.standings[driver].podiums = 0;
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
      }
    });
  })
  .controller('AddRaceReportCtrl', function ($scope, trackService, raceReportService, driverService) {
    $scope.tracks = trackService.getTracks();
    $scope.report = {};
    $scope.drivers = driverService.getDrivers();

    $scope.report.result = [];
    $scope.report.result.push({'finishPos': 1, 'driver': ''});

    $scope.selectTrack = function (trackId) {
      $scope.report.track = trackId;
    };

    $scope.submitRaceReport = function (report) {
      raceReportService.saveRaceReport(report);
    };
  })
  .controller('RaceReportOverviewCtrl', function ($scope, trackService, raceReportService) {
    $scope.raceReports = raceReportService.getRaceReports();
    $scope.tracks = trackService.getTracks();
  });
