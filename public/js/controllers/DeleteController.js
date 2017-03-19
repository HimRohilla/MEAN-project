var mainApp = angular.module('mainApp');

mainApp.controller('DeleteController', ['$scope', '$http', function($scope, $http) {
	$scope.formData = {};
	$scope.getStudentData = function(formData) {
		$http({
			method  : 'GET',
			url     : '/student/getStudentDetails',
			params 	: formData,
			headers : { 'Content-Type': 'text/html' }
		})
		.success(function(data) {
			if(data.success) {
				if(data.error_message) {
					Materialize.toast(data.error_message, 3000, 'round');
				}
				else {
					$scope.divHide = true;
					$scope.formData.name = data.student_details.name;
					$scope.formData.class = data.student_details.class;
					$scope.formData.subjects = data.student_details.subjects;
				}
			}
			else{
				if(data.error_message !== undefined)
					Materialize.toast(data.error_message, 3000, 'round');
				else
					Materialize.toast("Sorry some error occured", 3000, 'round');
			}
		});
	}
	$scope.deleteStudent = function(formData) {
		$http({
			method  : 'POST',
			url     : '/student/deleteStudent',
			data    : $.param(formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if(data.success) {
				Materialize.toast('Student deleted!!', 3000, 'round');
				$scope.formData = {};
				$scope.divHide = false;
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

	$scope.getTeacherData = function(formData) {
		$http({
			method  : 'GET',
			url     : '/teacher/getTeacherDetails',
			params 	: formData,
			headers : { 'Content-Type': 'text/html' }
		})
		.success(function(data) {
			if(data.success) {
				if(data.error_message) {
					Materialize.toast(data.error_message, 3000, 'round');
				}
				else {
					$scope.divHide1 = true;
					$scope.formData.name = data.teacher_details.name;
					$scope.formData.classes = data.teacher_details.classes_taught;					
				}
			}
			else{
				if(data.error_message !== undefined)
					Materialize.toast(data.error_message, 3000, 'round');
				else
					Materialize.toast("Sorry some error occured", 3000, 'round');
			}
		});			
	}
	$scope.deleteTeacher = function(formData) {
		$http({
			method  : 'POST',
			url     : '/teacher/deleteTeacher',
			data    : $.param(formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if(data.success) {
				Materialize.toast('Teacher deleted!!', 3000, 'round');
				$scope.formData = {};
				$scope.divHide1 = false;
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