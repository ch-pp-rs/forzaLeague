'use strict';

angular.module('forzaLeagueApp')
  .service('seasonReportService', function ($firebase, $http, $q) {
    var seasonReportUrl = 'https://forza.firebaseio.com/raceReports/',
        seasons = [{'filename': 'season1', 'name': 'Spring 2014'}];

    this.getCurrentSeason = function () {
      return $firebase(new Firebase(seasonReportUrl));
    };

    this.getHistoricSeason = function (season) {
      var deferred = $q.defer();

      $http.get('/data/' + seasons[season - 1].filename + '.json').then(function(res){
        deferred.resolve(res.data);
      });

      return deferred.promise;
    };
  });
