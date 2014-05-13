'use strict';

angular.module('forzaLeagueApp')
  .controller('RaceReportCtrl', function ($scope, $routeParams, trackService, raceReportService) {
    $scope.report = raceReportService.getRaceReport($routeParams.id);
    trackService.getTracks().then(function(data){
      $scope.tracks = data;
    });
  });
