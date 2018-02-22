myApp.controller('topicSelection',function($scope, $rootScope, $http, $q, $location){

	//--Initialisation
	$scope.id = $rootScope.userId;
	$scope.topicsArr = [];
	$scope.checkedTopicInterest = [];
	$scope.checkedTopicExpertise = [];
	$scope.interestData = [];
	$scope.expertiseData = [];
	var deferred = $q.defer();

	//--Retrieving topics(id,name,followers) stored in database
	var url = "http://localhost:8081/v1.0/topics";
	$http.get(url)
	.success(function(api_response)
	{
		deferred.resolve(api_response);
	})
	.error(function(api_response)
	{
		deferred.reject(api_response);
	});

	deferred.promise.then(function(get_topics_response)
	{
		$scope.topics_length = get_topics_response.length;
		for(var i = 0; i < $scope.topics_length; i++)
		{
			$scope.topicsArr.push({
				name: get_topics_response[i].name,
				followers: get_topics_response[i].followerCount,
				id: get_topics_response[i].id
			});
		}
	});
	$scope.topics = $scope.topicsArr;

	//--Function to submit topics chosen by the user
	$scope.submitTopics = function(){
		console.log("The submitted list of topics of interest is: ",$scope.checkedTopicInterest);
		console.log("The submitted list of topics of expertise is: ",$scope.checkedTopicExpertise);

		//--Posting topics of interest selected by user
		for(var i = 1; i <= $scope.checkedTopicInterest.length; i++)
		{
			//--Concatenating a key-value pair of topic id and name to interestData if selected by user
			if($scope.checkedTopicInterest[i] === true){
				$scope.interestData.push({
					id: $scope.topicsArr[i-1].id,
					name: $scope.topicsArr[i-1].name
				});
				console.log("Interest topics=> Included topic id ",$scope.topicsArr[i-1].id, " with name ",$scope.topicsArr[i-1].name);
			}
		}

		//--Topics of interest being posted for user
		console.log("Topics being sent for interest are: ",$scope.interestData);
		url = "http://localhost:8080/v1.0/user/"+$scope.id+"/interesttopics/";
		deferred = $q.defer();
		$http.post(url,JSON.stringify($scope.interestData))
		.success(function(post_api_response){
			deferred.resolve(post_api_response);
			$scope.flag1 = "Success1";
		})
		.error(function(post_api_response){
			deferred.reject(post_api_response);
			$scope.flag1 = "Failure1";
		});


		//--Posting topics of expertise selected by use
		for(var i = 1; i <= $scope.checkedTopicExpertise.length; i++)
		{
			//--Concatenating a key-value pair of topic id and name to expertiseData if selected by user
			if($scope.checkedTopicExpertise[i] === true){
				$scope.expertiseData.push({
					id: $scope.topicsArr[i-1].id,
					name: $scope.topicsArr[i-1].name
				});
				console.log("Expertise topics=> Included topic id ",$scope.topicsArr[i-1].id, " with name ",$scope.topicsArr[i-1].name);
			}
		}

		//--Topics of expertise being posted for user
		console.log("Topics being sent for expertise are: ",$scope.expertiseData);
		url = "http://localhost:8080/v1.0/user/"+$scope.id+"/expertisetopics/";
		deferred = $q.defer();
		$http.post(url,JSON.stringify($scope.expertiseData))
		.success(function(post_api_response){
			deferred.resolve(post_api_response);
			$scope.flag2 = "Success2";
		})
		.error(function(post_api_response){
			deferred.reject(post_api_response);
			$scope.flag2 = "Failure2";
		});

		$scope.changeView('/home');
	};

	//--For changing view in SPA
	$scope.changeView = function(newView){
		$location.path(newView);
	}
});
