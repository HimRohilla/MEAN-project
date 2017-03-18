var mainApp = angular.module('mainApp');

mainApp.controller('ViewController', ['$scope', '$http', function($scope, $http) {
	$scope.getStudents = function() {
		$http({
			method  : 'GET',
			url     : '/student/getAllStudents',
			headers : { 'Content-Type': 'text/html' }
		})
		.success(function(data) {
			if(data.success) {
				$scope.students = data.students;
				$scope.numOfStudents = data.students.length;
			}
			else {
				Materialize.toast('Sorry some error occured!', 5000, 'round');
			}
		});
	}
	$scope.getTeachers = function() {
		$http({
			method  : 'GET',
			url     : '/teacher/getAllTeachers',
			headers : { 'Content-Type': 'text/html' }
		})
		.success(function(data) {
			if(data.success) {
				$scope.teachers = data.teachers;
				$scope.numOfTeachers = data.teachers.length;
			}
			else {
				Materialize.toast('Sorry some error occured!', 5000, 'round');
			}
		});
	}	
}]);