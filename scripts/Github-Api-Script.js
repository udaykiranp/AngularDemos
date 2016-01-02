var app = angular.module("mainModule", []);
var MainController = function($scope, $http) {
  $scope.username = "udaykiranp";
  $scope.user = null;
  $("#error-alert").hide();
  $scope.GetGithubUser = function() {
    try {
      $http.get("https://api.github.com/users/" + $scope.username)
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
    $scope.user = response.data;
  };
  var OnErrorResponse = function(response) {
    if (response.status === 404) {
      $("#error-alert").show().delay(3000);
      $("#error-alert").slideUp(500, function() {
        $("#error-alert").hide();
      });
    }
  };

};
app.controller("MainController", MainController);