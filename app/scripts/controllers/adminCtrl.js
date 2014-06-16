'use strict';

angular.module('forzaLeagueApp')
    .controller('AdminCtrl', function ($scope, $location, trackService, raceReportService, driverService) {
      var ref = new Firebase('https://forza.firebaseio.com/'),
          d = new Date();

      $scope.loggedIn = false;

      var auth = new FirebaseSimpleLogin(ref, function (error, user) {
        if (error) {
          console.log(error);
        } else if (user) {
          $scope.loggedIn = true;
          console.log('User logged in: ' + user.uid + ', Provider: ' + user.provider);
        } else {
          $scope.loggedIn = false;
          console.log('user not logged in');
        }
      });

      $scope.login = function(userEmail, userPassword) {
        auth.login('password', {
          email: userEmail,
          password: userPassword
        });
      };

      $scope.logout = function() {
        auth.logout();
      };

      $scope.setupTrackVote = function() {
        trackService.setupTrackVote(5);
        $location.path('/track-vote');
      }

      trackService.getTracks().then(function(data){
        $scope.tracks = data;
      });

      $scope.report = {};

      raceReportService.getNextRaceId().then(function (data) {
        $scope.report.id = data;
      });

      $scope.report.publishedDate = d.getTime();
      $scope.drivers = driverService.getDrivers();

      $scope.report.result = [];
      $scope.report.result.push({'finishPos': 0, 'driver': ''});

      $scope.submitRaceReport = function () {
        $scope.report.track = $scope.report.track.id;
        raceReportService.saveRaceReport($scope.report);
        $location.path('/race-report/' + $scope.report.id);
      };
    });
