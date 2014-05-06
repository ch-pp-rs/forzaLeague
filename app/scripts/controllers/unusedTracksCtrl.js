'use strict';

angular.module('forzaLeagueApp')
  .controller('UnusedTracksCtrl', function ($scope, trackService) {
    $scope.tracks = trackService.getUnusedTracks();

  });