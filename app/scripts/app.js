'use strict';

angular.module('forzaLeagueApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add-race-report', {
        templateUrl: 'views/add-race-report.html',
        controller: 'AddRaceReportCtrl'
      })
      .when('/race-report-overview', {
        templateUrl: 'views/race-report-overview.html',
        controller: 'RaceReportOverviewCtrl'
      })
      .when('/driver/:id', {
        templateUrl: 'views/driver.html',
        controller: 'DriverCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
