var myApp = angular.module("myApp",['ngRoute','ngSanitize']);

myApp.config(['$routeProvider',
	function($routeProvider)
	{
		$routeProvider.
			when('/',
			{
				templateUrl: "/html/login.html",
				controller: "login"
			}).
			when('/viewAll',
			{
				templateUrl: "/html/displayAllUsers.html",
				controller: "displayAllUsers"
			}).
			when('/userProfile',
			{
				templateUrl: "/html/userProfile.html",
				controller: "userProfile"
			}).
			when('/signUp',
			{
				templateUrl: '/html/signUp.html',
				controller: 'signUp'
			}).
			when('/home',
			{
				templateUrl: '/html/home.html',
				controller: 'home'
			}).
			when('/topicSelection',
			{
				templateUrl: '/html/topicSelection.html',
				controller: 'topicSelection'
			}).
			when('/postQuestion',
			{
				templateUrl: '/html/postQuestion.html',
				controller: 'postQuestion'
			}).
			when('/question/:quesId',
			{
				templateUrl: '/html/question.html',
				controller: 'quesAnswer'
			}).
			when('/quesExperts',
			{
				templateUrl: '/html/experts.html',
				controller: 'expertList'
			});
	}
]);
