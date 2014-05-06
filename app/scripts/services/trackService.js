'use strict';

angular.module('forzaLeagueApp')
  .service('trackService', function($firebase) {
    this.getTracks = function () {
      return $firebase(new Firebase('https://forza.firebaseio.com/tracks'));
    };

    this.getUnusedTracks = function () {
      return $firebase(new Firebase('https://forza.firebaseio.com/tracks'));
    };
  });