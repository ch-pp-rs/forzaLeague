'use strict';

angular.module('forzaLeagueApp')
  .controller('SetupTrackVoteCtrl', function ($scope, trackService) {
    trackService.setupTrackVote(5);
  });
