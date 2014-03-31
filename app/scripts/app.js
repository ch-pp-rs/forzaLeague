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
      .otherwise({
        redirectTo: '/'
      });
  });
