myApp.controller('quesAnswer',function($scope, $rootScope, $route, $routeParams, $http, $q, $location){
  //--Initialisation
  $scope.quesId = $routeParams.quesId;
  $scope.id = $rootScope.userId;
  $scope.quesInfo = [];
  $scope.ansArray = [];
  $scope.length = 0;
  $scope.qbutton = false;
  $scope.abutton = false;

  var deferred = $q.defer();
  var url = "http://localhost:8082/v1.0/questions/"+$scope.quesId;

  //--Retrieving question information
  $http.get(url)
	.success(function(api_ques_response)
	{
		deferred.resolve(api_ques_response);
	})
	.error(function(api_ques_response)
	{
		deferred.reject(api_ques_response);
	});

	deferred.promise.then(function(api_ques_info_response)
	{
    $scope.quesInfo.title = api_ques_info_response.title;
    $scope.quesInfo.questionText = api_ques_info_response.questionText;
    $scope.quesInfo.upvotes = api_ques_info_response.upvoteCount;
    $scope.quesInfo.downvotes = api_ques_info_response.downvoteCount;
    $scope.quesInfo.country = api_ques_info_response.ownerUser.country;
    $scope.quesInfo.username = api_ques_info_response.ownerUser.userName;
    $scope.quesInfo.ratioOfVotes = ($scope.quesInfo.upvotes/($scope.quesInfo.upvotes+$scope.quesInfo.downvotes))*100;
	});

  //--Retrieving all answers of this question
  var deferred1 = $q.defer();
  url = "http://localhost:8083/v1.0/question/"+$scope.quesId+"/answers";
  $http.get(url)
	.success(function(api_ans_response)
	{
		deferred1.resolve(api_ans_response);
	})
	.error(function(api_ans_response)
	{
		deferred1.reject(api_ans_response);
	});

	deferred1.promise.then(function(api_ans_info_response)
	{
    $scope.length = api_ans_info_response.length;
    for(var i = 0; i < $scope.length; i++)
    {
      $scope.ansArray.push({
        id: api_ans_info_response[i].id,
        upvotes: api_ans_info_response[i].upvoteCount,
        downvotes: api_ans_info_response[i].downvoteCount,
        description: api_ans_info_response[i].description,
        owneruser: api_ans_info_response[i].ownerUser.userName,
        ownercountry: api_ans_info_response[i].ownerUser.country,
        ratioOfVotes: (api_ans_info_response[i].upvoteCount/(api_ans_info_response[i].upvoteCount+api_ans_info_response[i].downvoteCount)*100)
      });
    }
	});

  /*TO-DO: Provide a limit on no of upvotes/downvotes by a user*/

  //--Function to upvote the question
  $scope.addQUp = function(){
    $scope.quesInfo.upvotes = $scope.quesInfo.upvotes+1;
    $scope.quesInfo.ratioOfVotes = ($scope.quesInfo.upvotes/($scope.quesInfo.upvotes+$scope.quesInfo.downvotes))*100;
    deferred = $q.defer();
    url = "http://localhost:8082/v1.0/question/"+$scope.quesId+"/upvote";

    $http.post(url)
  	.success(function(api_response)
  	{
  		deferred.resolve(api_response);
  	})
  	.error(function(api_response)
  	{
  		deferred.reject(api_response);
  	});
    $scope.qbutton = true;
  };

  //--Function to downvote the question
  $scope.addQDown = function(){
    $scope.quesInfo.downvotes = $scope.quesInfo.downvotes+1;
    $scope.quesInfo.ratioOfVotes = ($scope.quesInfo.upvotes/($scope.quesInfo.upvotes+$scope.quesInfo.downvotes))*100;

    deferred = $q.defer();
    url = "http://localhost:8082/v1.0/question/"+$scope.quesId+"/downvote";

    $http.post(url)
  	.success(function(api_response)
  	{
  		deferred.resolve(api_response);
  	})
  	.error(function(api_response)
  	{
  		deferred.reject(api_response);
  	});
    $scope.qbutton = true;
  };

  //--Function to upvote an answer
  $scope.addAUp = function(answer){
    answer.upvotes = answer.upvotes+1;
    answer.ratioOfVotes= (api_ans_info_response[i].upvoteCount/(api_ans_info_response[i].upvoteCount+api_ans_info_response[i].downvoteCount)*100);
    deferred = $q.defer();
    url = "http://localhost:8083/v1.0/answer/"+answer.id+"/upvote";

    $http.post(url)
  	.success(function(api_response)
  	{
  		deferred.resolve(api_response);
  	})
  	.error(function(api_response)
  	{
  		deferred.reject(api_response);
  	});
    $scope.abutton = true;
  };

  //--Function to downvote an answer
  $scope.addADown = function(answer){
    answer.downvotes = answer.downvotes+1;
    answer.ratioOfVotes= (api_ans_info_response[i].upvoteCount/(api_ans_info_response[i].upvoteCount+api_ans_info_response[i].downvoteCount)*100);

    deferred = $q.defer();
    url = "http://localhost:8083/v1.0/answer/"+answer.id+"/upvote";

    $http.post(url)
  	.success(function(api_response)
  	{
  		deferred.resolve(api_response);
  	})
  	.error(function(api_response)
  	{
  		deferred.reject(api_response);
  	});
    $scope.abutton = true;

  };

  //--Function to add an answer for this question
  $scope.postAnswer = function(){

  };
});
