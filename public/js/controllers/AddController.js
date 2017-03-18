var mainApp = angular.module('mainApp');

mainApp.controller('AddController', ['$scope', '$http', function($scope, $http) {
	$scope.addStudent = function(formData) {
		$http({
			method  : 'POST',
			url     : '/student/addStudent',
			data    : $.param(formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if(data.success) {
				Materialize.toast('Student Added!!', 3000, 'round');
				$scope.formData = {};
				$scope.addStudentForm.$setPristine();
			}
			else{
				if(data.error_message !== undefined)
					Materialize.toast(data.error_message, 3000, 'round');
				else {
					Materialize.toast("Sorry some error occured", 3000, 'round');
				}
			}
		});
	}
	$scope.addTeacher = function(formData) {
		$http({
			method  : 'POST',
			url     : '/teacher/addTeacher',
			data    : $.param(formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if(data.success) {
				Materialize.toast('Teacher Added!!', 3000, 'round');
				$scope.formData = {};
				$scope.addTeacherForm.$setPristine();
			}
			else{
				if(data.error_message !== undefined)
					Materialize.toast(data.error_message, 3000, 'round');
				else {
					Materialize.toast("Sorry some error occured", 3000, 'round');
				}
			}
		});		
	}
}]);