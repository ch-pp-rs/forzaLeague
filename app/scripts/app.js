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
      .when('/tv', {
        templateUrl: 'views/tv.html'
      })
      .when('/rules', {
        templateUrl: 'views/rules.html'
      })
      .when('/track-vote', {
        templateUrl: 'views/track-vote.html',
        controller: 'TrackVoteCtrl'
      })
      .when('/setup-track-vote', {
        templateUrl: 'views/setup-track-vote.html',
        controller: 'SetupTrackVoteCtrl'
      })
      .when('/add-race-report', {
        templateUrl: 'views/add-race-report.html',
        controller: 'AddRaceReportCtrl'
      })
      .when('/race-report-overview', {
        templateUrl: 'views/race-report-overview.html',
        controller: 'RaceReportOverviewCtrl'
      })
      .when('/race-report/:id', {
        templateUrl: 'views/race-report.html',
        controller: 'RaceReportCtrl'
      })
      .when('/driver/:id', {
        templateUrl: 'views/driver.html',
        controller: 'DriverCtrl'
      })
      .when('/leaderboards/', {
        templateUrl: 'views/leaderboards.html',
        controller: 'LeaderboardsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
