'use strict';

angular.module('forzaLeagueApp')
  .service('driverService', function () {
    var drivers = [
      {
        'id': 0,
        'name': 'Ben Smith',
        'gamertag': 'guitarben'
      },
      {
        'id': 1,
        'name': 'Jason Jefferey',
        'gamertag': 'M1lhous3'
      },
      {
        'id': 2,
        'name': 'Ben Chaplin',
        'gamertag': 'AxelTron'
      },
      {
        'id': 3,
        'name': 'Ben Grimwood',
        'gamertag': 'MysticTriEdge'
      },
      {
        'id': 4,
        'name': 'Thuin Khan',
        'gamertag': 'SacredMr T'
      },
      {
        'id': 5,
        'name': 'Ricky Clegg',
        'gamertag': 'rickyclegg'
      },
      {
        'id': 6,
        'name': 'Billy Pittard',
        'gamertag': 'Bonzai Bill'
      }
    ];

    this.getDrivers = function () {
      return drivers;
    };

    this.getDriver = function (id) {
      return drivers[id];
    };
  });