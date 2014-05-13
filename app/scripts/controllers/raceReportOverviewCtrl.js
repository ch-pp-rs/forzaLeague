'use strict';

angular.module('forzaLeagueApp')
  .controller('RaceReportOverviewCtrl', function ($scope, trackService, seasonReportService) {
    var raceReports = seasonReportService.getCurrentSeason();

    trackService.getTracks().then(function(data){
      $scope.tracks = data;
    });

    raceReports.$on('loaded', function(raceReports) {
      for (var raceReport in raceReports) {
        raceReports[raceReport].id = parseInt(raceReports[raceReport].id);
      }
      $scope.raceReports = raceReports;
    });

  });
