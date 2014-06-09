'use strict';

angular.module('forzaLeagueApp')
  .service('raceReportService', function ($firebase, $q, seasonReportService) {
    var raceReportUrl = 'https://forza.firebaseio.com/raceReports/';

    this.getRaceReport = function (id) {
      return $firebase(new Firebase(raceReportUrl + id));
    };

    this.getHistoricRaceReport = function (season, id) {
      var deferred = $q.defer();

      seasonReportService.getHistoricSeason(season).then(function(data) {
        deferred.resolve(data[id]);
      });

      return deferred.promise;
    };

    this.saveRaceReport = function (report) {
      var ref = new Firebase(raceReportUrl + report.id + '/');

      ref.update(angular.copy(report));
    };
      
    this.getNextRaceId = function () {
      var raceReports = seasonReportService.getCurrentSeason(),
          deferred = $q.defer();

      raceReports.$on('loaded', function(raceReports) {
        if (raceReports) {
          deferred.resolve(raceReports.length);
        } else {
          deferred.resolve(0);
        }
      });
        
      return deferred.promise;
    };
  });
