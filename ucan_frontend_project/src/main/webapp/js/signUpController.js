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

		var deferred = $q.defer();
		$http.post('http://localhost:8080/v1.0/users/', JSON.stringify(data))
		.success(function(response)
		{
			$scope.statusCode = 1;
			$scope.msg = "You are now a member of UCAN!";
			deferred.resolve(response);
		})
		.error(function(response)
		{
			$scope.statusCode = 0;
			$scope.msg="Sorry! No member has been created!";
			deferred.reject(response);
		});
		return deferred.promise;
	};

	$scope.changeView = function(newView){
		$location.path(newView);
	}
});
