myApp.controller('postQuestion',function($scope, $rootScope, $http, $q, $location){
  //--Initialisation
  $scope.id = $rootScope.userId;
  $scope.dbId = {};
  $scope.dbId = {id: $scope.id};
  $scope.flag = true;
  $scope.topicsArr = [];
  $scope.quesTitle = null;
  $scope.quesText = null;
  var deferred = $q.defer();
  $scope.quesTags=[];
  $scope.selectedTags = [];

  //--Fetching list of topics available in db for tagging the question
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

  $scope.filterTags = function(topicArrTuple){
    for(var ind in $scope.quesTags)
    {
      if($scope.quesTags[ind] == topicArrTuple.name)
      {
        return {id: topicArrTuple.id};
      }
    }
  }

  $scope.filterNullTags = function(tuple){
    return tuple != null;
  }

  //--Function to post new question to db
  $scope.postQues = function(){

    //--Fetch the id of tags selected by user for this new question
    $scope.selectedTags = $scope.topicsArr.map($scope.filterTags);
    $scope.selectedTags = $scope.selectedTags.filter($scope.filterNullTags);

    console.log("selected tags are: ",$scope.selectedTags);
    var data =
    {
      title: $scope.quesTitle,
      questionText: $scope.quesText,
      ownerUser: $scope.dbId,
      tags: $scope.selectedTags
    };

    console.log("Data being passed is: ",JSON.stringify(data));

    //console.log("Tags attached are: ",$scope.quesTags);
    deferred = $q.defer();
    url = "http://localhost:8082/v1.0/questions/";

    console.log("Before flag is: ",$scope.flag);
    $http.post(url, JSON.stringify(data))
    .success(function(post_api_response){
			deferred.resolve(post_api_response);
      $scope.flag = true;
		})
		.error(function(post_api_response){
			deferred.reject(post_api_response);
      $scope.flag = false;
		});

    console.log("Flag is: ",$scope.flag);
    if($scope.flag == false)
    {
      $scope.msg = "Oops! Your question is not submitted!";
    }
    else
    {
      $scope.changeView('/quesExperts');
    }
  };

  //--Change from current view to newView
	$scope.changeView = function(newView){
		$location.path(newView);
	};
});
