'use strict';

angular.module('forzaLeagueApp')
  .service('raceReportService', function ($firebase) {
    var raceReportUrl = 'https://forza.firebaseio.com/raceReports/';

    this.getRaceReport = function (id) {
      return $firebase(new Firebase(raceReportUrl + id));
    };

    this.saveRaceReport = function (report) {
      var ref = new Firebase(raceReportUrl + report.id + '/');

      ref.update(angular.copy(report));
    };
  });