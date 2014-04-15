'use strict';

angular.module('forzaLeagueApp')
  .controller('RaceReportOverviewCtrl', function ($scope, trackService, raceReportService) {
    $scope.raceReports = raceReportService.getRaceReports();
    $scope.tracks = trackService.getTracks();
  });
