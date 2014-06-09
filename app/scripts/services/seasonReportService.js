'use strict';

angular.module('forzaLeagueApp')
  .service('seasonReportService', function ($firebase, $http, $q) {
    var seasonReportUrl = 'https://forza.firebaseio.com/raceReports/';

    this.getCurrentSeason = function () {
      return $firebase(new Firebase(seasonReportUrl));
    };

    this.getHistoricSeason = function (season) {
      var deferred = $q.defer();

      $http.get('/data/finishedSeasons.json').then(function(res){
        deferred.resolve(res.data[parseInt(season) - 1]);
      });

      return deferred.promise;
    };
  });
