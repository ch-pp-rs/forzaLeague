'use strict';

angular.module('forzaLeagueApp')
  .service('driverService', function (seasonReportService) {
    function getDrivers () {
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
          'gamertag': 'kloobe'
        },
        {
          'id': 6,
          'name': 'Billy Pittard',
          'gamertag': 'Bonzai Bill'
        },
        {
          'id': 7,
          'name': 'Martin Smith',
          'gamertag': 'TwinSkate081'
        }
      ];

      return drivers;
    }

    function getPoints() {
      return [10, 8, 6, 4, 2, 1, 0];
    }

    function calculateStats(raceReports, driver) {
      var raceResult, race,
          points = getPoints();
      for (var raceReport in raceReports) {
        raceResult = {};
        race = raceReports[raceReport];

        for (var result in race.result) {
          if (driver.id === race.result[result].driver.id) {
            driver.points = driver.points + points[result];
            raceResult.position = parseInt(result) + 1;

            if (parseInt(result) === 0) {
              driver.wins = driver.wins + 1;
            }

            if (parseInt(result) <= 2) {
              driver.podiums = driver.podiums + 1;
            }

            driver.races = driver.races + 1;

            raceResult.track = raceReports[raceReport].track;
            raceResult.id = parseInt(raceReports[raceReport].id) + 1;
            raceResult.type = raceReports[raceReport].type;
            driver.raceResults.push(raceResult);
          }
        }

        if (driver.id === race.fastestLapDriver.id) {
          driver.fastestLaps = driver.fastestLaps + 1;
        }
      }

      driver.winPercentage = (driver.wins/driver.races)*100;
      driver.podiumPercentage = (driver.podiums/driver.races)*100;
      driver.fastestLapPercentage = (driver.fastestLaps/driver.races)*100;

      return driver;
    }

    function calculatePreviousStats(raceReports, driver) {
      var raceResult, race,
          points = getPoints();

      for (var raceReport in raceReports) {
        raceResult = {};
        race = raceReports[raceReport];

        for (var result in race.result) {
          if (driver.id === race.result[result].driver.id) {
            driver.points = driver.points + points[result];
            raceResult.position = parseInt(result) + 1;

            if (parseInt(result) === 0) {
              driver.wins = driver.wins + 1;
            }

            if (parseInt(result) <= 2) {
              driver.podiums = driver.podiums + 1;
            }

            driver.races = driver.races + 1;

            raceResult.track = raceReports[raceReport].track;
            raceResult.id = parseInt(raceReports[raceReport].id) + 1;
            raceResult.type = raceReports[raceReport].type;
            driver.season1.push(raceResult);
          }
        }

        if (driver.id === race.fastestLapDriver.id) {
          driver.fastestLaps = driver.fastestLaps + 1;
        }
      }

      driver.winPercentage = (driver.wins/driver.races)*100;
      driver.podiumPercentage = (driver.podiums/driver.races)*100;
      driver.fastestLapPercentage = (driver.fastestLaps/driver.races)*100;

      return driver;
    }

    this.getDrivers = function () {
      return getDrivers();
    };

    this.getDriver = function (id) {
      var drivers = getDrivers();

      return drivers[id];
    };

    this.getDriverWithStats = function (id) {
      var raceReports = seasonReportService.getCurrentSeason(),
          driver = this.getDriver(id);

      driver.races = 0;
      driver.points = 0;
      driver.wins = 0;
      driver.podiums = 0;
      driver.fastestLaps = 0;
      driver.raceResults = [];

      raceReports.$on('loaded', function(raceReports) {
        driver = calculateStats(raceReports, driver);
      });

      return driver;
    };

    this.getDriverWithAllStats = function (id) {
      var raceReports = seasonReportService.getCurrentSeason(),
          previousSeason = seasonReportService.getHistoricSeason(1),
          driver = this.getDriver(id);

      driver.races = 0;
      driver.points = 0;
      driver.wins = 0;
      driver.podiums = 0;
      driver.fastestLaps = 0;
      driver.raceResults = [];
      driver.season1 = [];

      raceReports.$on('loaded', function(raceReports) {
        driver = calculateStats(raceReports, driver);
      });

      previousSeason.then(function(raceReports){
        driver = calculatePreviousStats(raceReports, driver);
      });

      return driver;
    };

  });