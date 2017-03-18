var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/viewStudents', {
			templateUrl: '../../app/views/viewStudents.html',
			controller: 'ViewController'
		})
		.when('/viewTeachers', {
			templateUrl: '../../app/views/viewTeachers.html',
			controller: 'ViewController'
		})
		.when('/addStudent', {
			templateUrl: '../../app/views/addStudent.html',
			controller: 'AddController'
		})
		.when('/addTeacher', {
			templateUrl: '../../app/views/addTeacher.html',
			controller: 'AddController'
		})
		.when('/updateStudent', {
			templateUrl: '../../app/views/updateStudent.html',
			controller: 'UpdateController'
		})
		.when('/updateTeacher', {
			templateUrl: '../../app/views/updateTeacher.html',
			controller: 'UpdateController'
		})
		.when('/deleteStudent', {
			templateUrl: '../../app/views/deleteStudent.html',
			controller: 'DeleteController'
		})
		.when('/deleteTeacher', {
			templateUrl: '../../app/views/deleteTeacher.html',
			controller: 'DeleteController'
		})
	    // .otherwise({
	    //     redirectTo: '/addStudent'
	    // });
});
