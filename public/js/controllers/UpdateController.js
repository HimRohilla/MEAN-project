var mainApp = angular.module('mainApp');

mainApp.controller('UpdateController', ['$scope', '$http', function($scope, $http) {
	$scope.formData = {};
	$scope.updateStudent = function(formData) {
		$http({
			method  : 'POST',
			url     : '/student/updateStudent',
			data    : $.param(formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if(data.success) {
				Materialize.toast('Student details updated!!', 3000, 'round');
				$scope.formData = {};
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
	$scope.getStudentData = function(formData) {
		$scope.formData = {};
		$scope.formData.username = formData.username;
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
	$scope.updateTeacher = function(formData) {
		$http({
			method  : 'POST',
			url     : '/teacher/updateTeacher',
			data    : $.param(formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if(data.success) {
				Materialize.toast('Teacher details updated!!', 3000, 'round');
				$scope.formData = {};
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
		$scope.formData = {};
		$scope.formData.username = formData.username;
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
}]);