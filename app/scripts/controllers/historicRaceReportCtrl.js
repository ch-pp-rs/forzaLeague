'use strict';

angular.module('forzaLeagueApp')
  .controller('HistoricRaceReportCtrl', function ($scope, $routeParams, trackService, raceReportService) {
    raceReportService.getHistoricRaceReport($routeParams.season, $routeParams.id).then(function(data) {
      $scope.report = data;
    });

    trackService.getTracks().then(function(data){
      $scope.tracks = data;
    });
  });
