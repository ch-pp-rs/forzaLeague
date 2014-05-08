'use strict';

angular.module('forzaLeagueApp')
  .service('trackService', function($firebase, raceReportService, $q) {
    function getTracks () {
      return $firebase(new Firebase('https://forza.firebaseio.com/tracks'));
    }

    function getUnusedTracks () {
      var deferred = $q.defer(),
          tracksUsed = [],
          tracksNotUsed = [],
          raceReports = raceReportService.getRaceReports(),
          tracks = getTracks();

      raceReports.$on('loaded', function(raceReports) {
        for (var raceReport in raceReports) {
          tracksUsed.push(raceReports[raceReport].track);
        }
      });

      raceReports.$on('loaded', function() {
        tracks.$on('loaded', function(tracks) {
          for (var track in tracks) {
            if (tracksUsed.indexOf(tracks[track].id) === -1) {
              tracksNotUsed.push(tracks[track]);
            }
          }

          deferred.resolve(tracksNotUsed);
        });
      });

      return deferred.promise;
    }

    this.getTracks = function () {
      return getTracks();
    };

    this.getUnusedTracks = function () {
      return getUnusedTracks();
    };

    this.setupTrackVote = function (numberOfTracks) {
      var i, randNum,
          allRandNum = [],
          tracksToSelectFrom = [],
          trackVoteUrl = 'https://forza.firebaseio.com/trackVote/',
          ref = new Firebase(trackVoteUrl);

      getUnusedTracks().then(function(tracks) {
        for (i = 0; i < numberOfTracks; i++) {
          randNum = Math.round(Math.random()*(tracks.length - 1));

          if (allRandNum.indexOf(randNum) === -1) {
            allRandNum.push(randNum);
            tracks[randNum].vote = 0;
            tracksToSelectFrom.push(tracks[randNum]);
          }
        }

        ref.update(tracksToSelectFrom);
      });
    };
  });