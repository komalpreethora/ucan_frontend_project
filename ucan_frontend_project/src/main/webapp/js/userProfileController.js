myApp.controller('userProfile', function($scope, $http, $q, $location, $rootScope)
{
    //--Function:- Display user profile
    //             Includes personal info, topics, QnA info

    //--Initialisation
    $scope.id = $rootScope.userId;
    $scope.in_userName = null;
    $scope.in_contact = null;
    $scope.in_password = null;
    $scope.in_email = null;
    $scope.in_country = null;
    $scope.userExpertiseTopics = [];
    $scope.userInterestTopics = [];
    $scope.checkedTopicInterest = [];
    $scope.checkedTopicExpertise = [];
    $scope.isEditable = true;
    $scope.buttonText = "Edit"

    var deferred = $q.defer();

    var url = "http://localhost:8080/v1.0/users/id/"+$scope.id
    $http.get(url)
    .success(function(api_get_response){
      deferred.resolve(api_get_response);
    })
    .error(function(api_get_response){
      deferred.reject(api_get_response);
    });

    //--For obtaining data fetched from API
    deferred.promise.then(function(api_user_info_response){
      $scope.in_userName = api_user_info_response.userName;
      $scope.in_contact = api_user_info_response.contact;
      $scope.in_password = api_user_info_response.password;
      $scope.in_email = api_user_info_response.email;
      $scope.in_country = api_user_info_response.country;

      console.log("expertiseTopics: "+api_user_info_response.expertiseTopics.length);

      for(var i = 0; i < api_user_info_response.expertiseTopics.length; i++)
      {
        $scope.userExpertiseTopics.push({
          name: api_user_info_response.expertiseTopics[i].name,
          id: api_user_info_response.expertiseTopics[i].id,
          followerCount: api_user_info_response.expertiseTopics[i].followerCount
        });
      }

      for(var i = 0; i < api_user_info_response.intrestedTopics.length; i++)
      {
        $scope.userInterestTopics.push({
          name: api_user_info_response.intrestedTopics[i].name,
          id: api_user_info_response.intrestedTopics[i].id,
          followerCount: api_user_info_response.intrestedTopics[i].followerCount
        });
      }
    });

    //--Depending on the value of isEditable var, call appropriate function
    $scope.edit = function(){
      if($scope.isEditable)
      {
        $scope.startEdit();
      }
      else {
        $scope.editUser();
      }
    };

    //--Change button text and also value of var isEditable
    $scope.startEdit = function(){
      $scope.buttonText = "Post Changes"
      $scope.isEditable = false;
      $scope.topicsArr = [];

      //Fetch all topics available in db and display in form of checkboxes for 2 categories
      deferred = $q.defer();
      url = "http://localhost:8081/v1.0/topics";

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

    };

    //--Obtain all fields of user information and put them
    $scope.editUser = function(){

      $scope.interestData = [];
      $scope.expertiseData = [];

      //--Obtaining selection of interested topics for user
      for(var i = 1; i <= $scope.checkedTopicInterest.length; i++)
  		{
  			//--Concatenating a key-value pair of topic id and name to interestData if selected by user
  			if($scope.checkedTopicInterest[i] === true){
  				$scope.interestData.push({
  					id: $scope.topicsArr[i-1].id,
  					name: $scope.topicsArr[i-1].name
  				});
  			}
  		}

      //--Obtaining selection of expertise topics for user
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

      var data = {
        id: $rootScope.userId,
        userName: $scope.in_userName,
        password: $scope.in_password,
        email: $scope.in_email,
        contact: $scope.in_contact,
        country: $scope.in_country,
        expertiseTopics: $scope.expertiseData,
        intrestedTopics: $scope.interestData
      };

      //--Post the edits made by user in his/her profile
      deferred = $q.defer();
      url = 'http://localhost:8080/v1.0/users/'+$scope.id
      $http.put(url, JSON.stringify(data))
      .success(function(response){
        //--msg & statusCode for testing purposes
        $scope.msg = "Put Data Method Executed Successfully!";
        $scope.statusCode = 1;
        deferred.resolve(response);
      })
      .error(function(response){
        $scope.msg = "Service doesn't exist!";
        $scope.statusCode = 0;
	      deferred.reject(response);
      });

      //--Redirect to home page
      $scope.changeView('/home');
  };

  //--Change view in SPA
  $scope.changeView = function(view){
    $location.path(view);
  };

});
