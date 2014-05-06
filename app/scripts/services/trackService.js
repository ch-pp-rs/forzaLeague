'use strict';

angular.module('forzaLeagueApp')
  .service('trackService', function($firebase, raceReportService) {
    this.getTracks = function () {
      return $firebase(new Firebase('https://forza.firebaseio.com/tracks'));
    };

    this.getUnusedTracks = function () {
      var tracksUsed = [],
          tracksNotUsed = [],
          raceReports = raceReportService.getRaceReports(),
          tracks = $firebase(new Firebase('https://forza.firebaseio.com/tracks'));

      raceReports.$on('loaded', function(raceReports) {
        for (var raceReport in raceReports) {
          tracksUsed.push(raceReports[raceReport].track);
          console.log(tracksUsed);
        }
      });

      raceReports.$on('loaded', function() {
        tracks.$on('loaded', function(tracks) {
          for (var track in tracks) {
            console.log(tracks[track].id);

            if (tracksUsed.indexOf(tracks[track].id) === -1) {
              tracksNotUsed.push(tracks[track]);
            }
          }
        });
      });

      return tracksNotUsed;
    };
  });