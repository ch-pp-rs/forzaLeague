'use strict';

angular.module('forzaLeagueApp')
  .controller('SetupTrackVoteCtrl', function ($scope, trackService) {
    var trackVoteUrl = 'https://forza.firebaseio.com/trackVote/',
        ref = new Firebase(trackVoteUrl);

    $scope.tracks = trackService.getTracks();

    $scope.tracks.$on('loaded', function(tracks) {
      var i, randNum, allRandNum = [], tracksToSelectFrom = [];

      for (i = 0; i < 5; i++) {
        randNum = Math.round(Math.random()*(tracks.length-1));

        if (allRandNum.indexOf(randNum) === -1) {
          allRandNum.push(randNum);
          tracks[randNum].vote = 0;
          tracksToSelectFrom.push(tracks[randNum]);
        }
      }

      ref.update(tracksToSelectFrom);
      $scope.message = 'Tracks successfully loaded.';
    });
  });