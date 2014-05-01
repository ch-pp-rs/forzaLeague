'use strict';

angular.module('forzaLeagueApp')
  .controller('AddRaceReportCtrl', function ($scope, trackService, raceReportService, driverService) {
    $scope.tracks = trackService.getTracks();

    $scope.report = {};
    $scope.drivers = driverService.getDrivers();

    $scope.report.result = [];
    $scope.report.result.push({'finishPos': 0, 'driver': ''});

    $scope.selectTrack = function (trackId) {
      $scope.report.track = trackId;
    };

    $scope.submitRaceReport = function (report) {
      raceReportService.saveRaceReport(report);
    };
  });