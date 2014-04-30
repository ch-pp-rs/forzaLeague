'use strict';

angular.module('forzaLeagueApp')
  .service('raceReportService', function ($firebase, $q) {
    var raceReportUrl = 'https://forza.firebaseio.com/raceReports/';

    this.getRaceReports = function () {
      return $firebase(new Firebase(raceReportUrl));
    };

    this.getRaceReport = function (id) {
      return $firebase(new Firebase(raceReportUrl + id));
    };

    this.saveRaceReport = function (report) {
      var ref = new Firebase(raceReportUrl + report.id + '/');

      ref.update(angular.copy(report));
    };

    this.getNextRaceId = function () {
      var totalRaces = 1,
          ref = new Firebase(raceReportUrl),
          races = $firebase(ref),
          deferred = $q.defer();

      races.$on('loaded', function(races) {
        for (var race in races) {
          console.log(race);
          totalRaces = totalRaces + 1;
        }
        deferred.resolve(totalRaces);
        return deferred.promise;
      });
    };
  });