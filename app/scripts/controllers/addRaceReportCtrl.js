'use strict';

angular.module('forzaLeagueApp')
  .controller('AddRaceReportCtrl', function ($scope, trackService, raceReportService, driverService) {
    var d = new Date();
      
    trackService.getTracks().then(function(data){
      $scope.tracks = data;
    });

    $scope.report = {};

    raceReportService.getNextRaceId().then(function (data) {
      $scope.report.id = data;
    });
      
    $scope.report.publishedDate = String(d.getTime());
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