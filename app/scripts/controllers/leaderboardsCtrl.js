'use strict';

angular.module('forzaLeagueApp')
    .controller('LeaderboardsCtrl', function ($scope, $http) {
      var url = 'http://forza.herokuapp.com/a/44/220/';

      $http({method: 'GET', url: url}).success(
        function(data) {
          console.log(data);
          $scope.results = data.Results;
        });
    });