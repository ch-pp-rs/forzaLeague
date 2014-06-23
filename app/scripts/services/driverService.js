'use strict';

angular.module('forzaLeagueApp')
  .service('driverService', function ($q, seasonReportService) {
    function getDrivers () {
      var drivers = [
        {
          'id': 0,
          'name': 'Ben Smith',
          'gamertag': 'guitarben',
          'role': 'producer',
          'team': 'producer'
        },
        {
          'id': 1,
          'name': 'Jason Jefferey',
          'gamertag': 'M1lhous3',
          'role': 'developer',
          'team': 'developer'
        },
        {
          'id': 2,
          'name': 'Ben Chaplin',
          'gamertag': 'AxelTron',
          'role': 'developer',
          'team': 'developer'
        },
        {
          'id': 3,
          'name': 'Ben Grimwood',
          'gamertag': 'MysticTriEdge',
          'role': 'producer',
          'team': 'producer'
        },
        {
          'id': 4,
          'name': 'Thuin Khan',
          'gamertag': 'SacredMr T',
          'role': 'producer',
          'team': 'producer'
        },
        {
          'id': 5,
          'name': 'Ricky Clegg',
          'gamertag': 'kloobe',
          'role': 'developer',
          'team': 'developer'
        },
        {
          'id': 6,
          'name': 'Billy Pittard',
          'gamertag': 'Bonzai Bill',
          'role': 'producer',
          'team': 'producer'
        },
        {
          'id': 7,
          'name': 'Martin Smith',
          'gamertag': 'TwinSkate081',
          'role': 'developer',
          'team': 'developer'
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

            if (!race.result[result].noPointsAwarded) {
                driver.points = driver.points + points[result];
            }
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

    this.getTeamStandings = function() {
      var teamStat,
          finalTeams = [],
          raceReport,
          result,
          raceResult,
          team,
          teams = [],
          points = getPoints(),
          def = $q.defer();

      seasonReportService.getCurrentSeason().$on('loaded', function(raceReports) {
        for (raceReport in raceReports) {
          raceResult = raceReports[raceReport].result;

          for (result in raceResult) {
            team = raceResult[result].driver.team;

            if (!teams[team]) {
              teams[team] = {};
              teams[team].name = 'Team ' + team.toUpperCase();
              teams[team].points = 0;
              teams[team].races = 0;
              teams[team].wins = 0;
              teams[team].podiums = 0;
            }

            teams[team].points = teams[team].points + points[result];
            teams[team].races = teams[team].races + 1;

            if (parseInt(result) === 0) {
              teams[team].wins = teams[team].wins + 1;
            }

            if (parseInt(result) <= 2) {
              teams[team].podiums = teams[team].podiums + 1;
            }

            teams[team].ppr = teams[team].points/teams[team].races;
          }
        }

        for (teamStat in teams) {
          finalTeams.push(teams[teamStat]);
        }
        def.resolve(finalTeams);
      });




      return def.promise;
    };
  });