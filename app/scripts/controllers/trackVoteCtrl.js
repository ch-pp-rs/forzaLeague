'use strict';

angular.module('forzaLeagueApp')
  .controller('TrackVoteCtrl', function ($scope, trackService, $firebase) {
    var trackVoteUrl = 'https://forza.firebaseio.com/trackVote/',
        ref = new Firebase(trackVoteUrl);

    $scope.tracksToSelectFrom = $firebase(ref);

    $scope.voteForTrack = function (id) {
      var voteRef = new Firebase(trackVoteUrl + String(id));

      $scope.tracksToSelectFrom[id].vote = $scope.tracksToSelectFrom[id].vote + 1;
      voteRef.update($scope.tracksToSelectFrom[id]);

      $scope.userVoted = true;
    };
  });