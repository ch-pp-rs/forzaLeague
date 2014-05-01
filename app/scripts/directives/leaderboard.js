'use strict';

angular.module('forzaLeagueApp')
  .directive('flLeaderboard', function ($http) {
    return {
      restrict: 'A',
      scope: {
        flTitle: '=',
        flType: '=',
        flLocation: '=',
        flTrack: '='
      },
      templateUrl: '/scripts/directives/templates/leaderboard.html',
      link: function (scope) {
        var url = 'http://forza.herokuapp.com/' + scope.flType + '/' + scope.flLocation + '/' + scope.flTrack;

        $http({method: 'GET', url: url}).success(
          function(data) {
            scope.results = data.Results;
          }
        );

        console.log(scope.flTitle);
      }
    };
  });