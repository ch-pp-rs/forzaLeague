'use strict';

angular.module('forzaLeagueApp')
  .controller('MainCtrl', function () {
    console.log('Here');
  })
  .controller('AddRaceReportCtrl', function ($scope, $firebase) {
    var ref = new Firebase('https://forza.firebaseio.com/tracks');

    $scope.tracks = $firebase(ref);

    $scope.report = {};
    $scope.report.date;

    $scope.drivers = [{'name': 'Smithy'}, {'name': 'Json'}, {'name': 'Chappers'}, {'name': 'Grimmers'}];

    $scope.report.result = [];

    for (var n = 0; n < 16; n += 1) {
      $scope.report.result[n] = {'finishPos': n, 'driver': ''};
    }

    $scope.selectTrack = function(track) {
      $scope.report.track = track;
    }

    $scope.submitRaceReport = function(report) {
      ref = new Firebase('https://forza.firebaseio.com/raceReports/' + report.date + '/');
      ref.update(angular.copy(report));
    }
  });
