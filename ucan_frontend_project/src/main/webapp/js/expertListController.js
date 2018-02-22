myApp.controller('expertList',function($scope, $rootScope, $http, $q, $location){
  //--Initialisation
  $scope.userExpertArray = [];
  $scope.expert = {};

  var deferred = $q.defer();

  //--Function to find list of experts based on tags/topics applied for the question
  var url = 'http://localhost:8080/v1.0/topics/experts/';

  //--Function to post the user's selection for expert
  $scope.selectExpert = function(){

  };

});
