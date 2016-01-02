var app = angular.module("weatherModule", []);
var WeatherController = function($scope, $http) {
  $scope.latitude = "37.8267";
  $scope.longitude = "-122.423";
  $scope.weather = null;
  $("#error-alert").hide();
  
  

  $scope.GetWeatherDetails = function() {
    try {
      $http.get("https://api.forecast.io/forecast/548c3cd09d6ed2154a79f284aa6ec488/" + $scope.latitude+","+$scope.longitude)
        .then(function(response) {
            $("#error-alert").hide();
            OnSuccessResponse(response);
          },
          function(response) {
            OnErrorResponse(response);
          });
    } catch (e) {
      console.log(e);
    }

  };

  var OnSuccessResponse = function(response) {
    $scope.weather = response.data;
  };
  var OnErrorResponse = function(response) {
    if (response.status === 404) {
      $("#error-alert").show().delay(3000);
      $("#error-alert").slideUp(500, function() {
        $("#error-alert").hide();
      });
    }
  };
  
  var GetTime = function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
};

};
app.controller("WeatherController", WeatherController);


app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {

      config.headers['Access-Control-Allow-Origin'] = 'http://run.plnkr.co';

      return config;
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
