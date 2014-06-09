'use strict';

angular.module('forzaLeagueApp')
  .service('trackService', function($firebase, seasonReportService, $http, $q) {
    var carClasses = ['D', 'C', 'B', 'A', 'S', 'R', 'P', 'X'];
    
    function getTracks () {
      var deferred = $q.defer();

      $http.get('/data/tracks.json').then(function(res){
        deferred.resolve(res.data);
      });

      return deferred.promise;
    }

    function getUnusedTracks () {
      var deferred = $q.defer(),
          tracksUsed = [],
          tracksNotUsed = [],
          raceReports = seasonReportService.getCurrentSeason(),
          tracks = getTracks();

      raceReports.$on('loaded', function(raceReports) {
        for (var raceReport in raceReports) {
          tracksUsed.push(raceReports[raceReport].track);
        }
      });

      raceReports.$on('loaded', function() {
        tracks.then(function(tracks) {
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
      var i, randTrackNum, randClassNum,
          allRandNum = [],
          tracksToSelectFrom = [],
          trackVoteUrl = 'https://forza.firebaseio.com/trackVote/',
          ref = new Firebase(trackVoteUrl);

      getUnusedTracks().then(function(tracks) {
        for (i = 0; i < numberOfTracks; i++) {
          randClassNum = Math.round(Math.random()*(carClasses.length - 1));
          randTrackNum = Math.round(Math.random()*(tracks.length - 1));
          
          if (allRandNum.indexOf(randTrackNum) === -1) {
            allRandNum.push(randTrackNum);
            tracks[randTrackNum].vote = 0;
            tracks[randTrackNum].carClass = carClasses[randClassNum];
            tracksToSelectFrom.push(tracks[randTrackNum]);
          }
        }

        ref.update(tracksToSelectFrom);
      });
    };
  });