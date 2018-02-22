myApp.controller('home',function($scope, $rootScope, $http, $q, $location){
	//--Initialisation
	$scope.id = $rootScope.userId;
	$scope.name = $rootScope.userName;
	$scope.topics_flag = false;
	$scope.quesE_flag = true;
	$scope.quesI_flag = true;
	$scope.topicsInterestSubscribed = [];
	$scope.topicsExpertiseSubscribed = [];
	$scope.quesIArr = [];
	$scope.quesEArr = [];
	$scope.topicOfInterest = [];
	$scope.topicOfExpertise = [];
	var deferred = $q.defer();
	var deferred2 = $q.defer();

	//--Fetching user choices for topics of interest
	var url1 = "http://localhost:8080/v1.0/users/"+$scope.id+"/interesttopics";
	$http.get(url1)
	.success(function(api_interest_response)
	{
		deferred.resolve(api_interest_response);
	})
	.error(function(api_interest_response)
	{
		$scope.msg = "No such User/Error in js";
		deferred.reject(api_interest_response);
	});

	deferred.promise.then(function(api_topics_i_response)
	{
		$scope.length = api_topics_i_response.length;
		if($scope.length === 0)
		{
			$scope.topics_flag = false;
		}
		else
		{
			$scope.topics_flag = true;
			for(var i = 0; i < $scope.length; i++)
			{
				$scope.topicsInterestSubscribed.push({
					name:api_topics_i_response[i].name,
					id: api_topics_i_response[i].id,
				});
			}
		}
	});

	//--Fetching user choices for topics of expertise
	var url2 = "http://localhost:8080/v1.0/users/"+$scope.id+"/expertisetopics";
	$http.get(url2)
	.success(function(api_expertise_response)
	{
		deferred2.resolve(api_expertise_response);
	})
	.error(function(api_expertise_response)
	{
		$scope.msg = "No such User/Error in js";
		deferred2.reject(api_expertise_response);
	});

	deferred2.promise.then(function(api_topics_e_response)
	{
		$scope.length = api_topics_e_response.length
		if($scope.length === 0)
		{
			$scope.topics_flag = false;
		}
		else
		{
			$scope.topics_flag = true;
			for(var i = 0; i < $scope.length; i++)
			{
				$scope.topicsExpertiseSubscribed.push({
					name:api_topics_e_response[i].name,
					id: api_topics_e_response[i].id,
				});
			}
		}
	});

	//--Function to execute when item is changed in single select for interest topics
	$scope.changeInterestTopic = function(data){
		//This is done to ensure the scope you are referring to is that of the parent scope only
		$scope.topicOfInterest = data;
		deferred = $q.defer();
		var url1 = 'http://localhost:8082/v1.0/questions/tags';
		var params = [];
		params.push({
			id: $scope.topicOfInterest.id,
			name: $scope.topicOfInterest.name
		});

		$http.post(url1,JSON.stringify(params))
		.success(function(api_ques_response)
		{
			deferred.resolve(api_ques_response);
		})
		.error(function(api_ques_response)
		{
			$scope.msg = "No such User/Error in js";
			deferred.reject(api_ques_response);
		});

		deferred.promise.then(function(api_ques_i_response)
		{
			$scope.length = api_ques_i_response.length;
			if($scope.length === 0)
			{
				$scope.quesI_flag = false;
			}
			else
			{
				$scope.quesI_flag = true;
				for(var i = 0; i < $scope.length; i++)
				{
					$scope.quesIArr.push({
						id: api_ques_i_response[i].id,
						quesText:api_ques_i_response[i].questionText,
						title: api_ques_i_response[i].title,
					});
				}
			}
		});

	};

	//--Function to execute when item is changed in single select for expertise topics
	$scope.changeExpertiseTopic = function(data){
		//This is done to ensure the scope you are referring to is that of the parent scope only
		$scope.topicOfExpertise = data;
		console.log("Topic of I is ",$scope.topicOfExpertise);

		deferred = $q.defer();
		var url1 = 'http://localhost:8082/v1.0/questions/tags';
		var params = [];
		params.push({
			id: $scope.topicOfExpertise.id,
			name: $scope.topicOfExpertise.name
		});

		$http.post(url1,JSON.stringify(params))
		.success(function(api_ques_response)
		{
			deferred.resolve(api_ques_response);
		})
		.error(function(api_ques_response)
		{
			$scope.msg = "No such User/Error in js";
			deferred.reject(api_ques_response);
		});

		deferred.promise.then(function(api_ques_e_response)
		{
			$scope.length = api_ques_e_response.length
			if($scope.length === 0)
			{
				$scope.quesE_flag = false;
			}
			else
			{
				$scope.quesE_flag = true;
				for(var i = 0; i < $scope.length; i++)
				{
					$scope.quesEArr.push({
						id:api_ques_e_response[i].id,
						quesText:api_ques_e_response[i].questionText,
						title: api_ques_e_response[i].title,
					});
				}
			}
		});
	};

	//--Change from current view to newView
	$scope.changeView = function(newView){
		$location.path(newView);
	};
});
