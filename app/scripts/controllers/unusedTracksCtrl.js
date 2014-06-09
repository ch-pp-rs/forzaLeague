'use strict';

angular.module('forzaLeagueApp')
  .controller('UnusedTracksCtrl', function ($scope, trackService) {
    trackService.getUnusedTracks().then(function(tracks) {
      $scope.tracks = tracks;
    });
  });