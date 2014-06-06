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
        console.log(data);
        deferred.resolve(data[id]);
      });

      return deferred.promise;
    };

    this.saveRaceReport = function (report) {
      var ref = new Firebase(raceReportUrl + report.id + '/');

      ref.update(angular.copy(report));
    };
  });