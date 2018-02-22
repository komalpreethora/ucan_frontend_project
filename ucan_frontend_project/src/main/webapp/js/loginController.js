myApp.controller('login',function($scope, $http, $q, $location, $rootScope)
	{
		$scope.email = null;
		$scope.password = null;
		$scope.user_factory_input = null;

		//obtain credentials entered and verify if such a user exists or not
		$scope.loginUser = function(in_email, in_password)
		{
			email = in_email;
			password = in_password;

			var data =
			{
				email : in_email
			};

			var deferred = $q.defer();
			var url = "http://localhost:8080/v1.0/users/"+$scope.email;
			$http.get(url,JSON.stringify(data))
			.success(function(api_response)
			{
				deferred.resolve(api_response);
			})
			.error(function(api_response)
			{
				$scope.msg = "No such User/Error in js";
				deferred.reject(api_response);
			});

			//passing deferred.promise to check if the credentials entered are right or not
			$scope.authCheck(deferred.promise);
		};

		//checks if fetched user attributes match entered credentials
		$scope.authCheck = function(data)
		{
			data.then(function(get_user_response)
			{
				$scope.user_factory_input = get_user_response;
				if(get_user_response.password === $scope.password)
				{
					//save user id and change view to home page
					$rootScope.userId = get_user_response.id;
					$rootScope.userName = get_user_response.userName;
					$scope.path_home = '/home';
					$scope.changeView($scope.path_home);
				}
				else
				{
					$scope.msg1 = "Wrong credentials entered!";
				}
			});
		};

		//change current view to newView
		$scope.changeView = function(newView)
		{
			$location.path(newView);
		};
	});

myApp.controller('signUp',function($scope, $http, $q, $location)
{
	$scope.userName = null;
	$scope.password = null;
	$scope.email = null;
	$scope.contact = null;
	$scope.country = null;

	$scope.createUser = function(in_userName, in_password, in_email, in_contact, in_country)
	{
		var data =
		{
			userName : in_userName,
			password : in_password,
			email : in_email,
			contact : in_contact,
			country : in_country
		};

		console.log("User data is : ",data);
		var deferred = $q.defer();
		$http.post('http://localhost:8080/v1.0/users/', JSON.stringify(data))
		.success(function(response)
		{
			$scope.statusCode = 1;
			$scope.msg2 = "You are now a member of UCAN!";
			deferred.resolve(response);
		})
		.error(function(response)
		{
			$scope.statusCode = 0;
			$scope.msg2="Uh oh! New profile not created.";
			deferred.reject(response);
		});
	};

	$scope.changeView = function(newView){
		$location.path(newView);
	}
});
