var express = require('express');
var app = express();
var router = express.Router();
var User = require(__base + 'app/models/User');
var Student = require(__base + 'app/models/Student');
var functions = require(__base + 'app/utility/functions');

router.get('/', function(req, res) {
	res.end();
});

router.get('/getAllStudents', function(req, res) {
	Student.find({}, 'subjects class user_details')
	.populate('user_details')
	.exec(function(err, students) {
		var finalJSON = {};
		if(err) {
			finalJSON.success = false;
			functions.sendResponse(res, finalJSON);
		}
		else {
			finalJSON.success = true;
			finalJSON.count = students.length;
			var arr = [];
			for (var i = students.length - 1; i >= 0; i--) {
				arr[i] = {class: students[i].class, subjects: students[i].subjects, name: students[i].user_details.name, username: students[i].user_details.username};
			}
			finalJSON.students = arr;
			functions.sendResponse(res, finalJSON);
		}
	})
});

router.post('/addStudent', function(req, res) {
	var data = req.body;
	var newUser = User({
		name: data.name,
		username: data.username,
		password: data.password
	});
	var finalJSON = {};
	newUser.save(function(err) {
		if(err) {
			finalJSON.success = false;
			finalJSON.error_message = 'Username already exists';
			functions.sendResponse(res, finalJSON);			
		}
		else{
			var newStudent = Student({
				class: data.class,
				subjects: data.subjects,
				user_details: newUser._id
			});
			newStudent.save(function(err) {
				if(err) {
					finalJSON.success = false;
					finalJSON.error_message = 'Student not saved, some error occured';
					functions.sendResponse(res, finalJSON);
				}
				else {
					finalJSON.success = true;
					functions.sendResponse(res, finalJSON);
				}
			})
		}
	})
});

router.get('/getStudentDetails', function(req, res) {
	var data = req.query;

	User.find({username: data.username}, '_id')
	.exec(function(err, user_details_data) {
		var finalJSON = {};
		if(err) {
			finalJSON.success = false;
			finalJSON.error_message = "Some error occured!";
			functions.sendResponse(res, finalJSON);
		}
		else {
			if(user_details_data.length == 0) {
				finalJSON.success = true;
				finalJSON.error_message = "User doesnt exists";
				functions.sendResponse(res, finalJSON);
			}
			else {
				Student.find({user_details: user_details_data[0]._id}, 'subjects class user_details')
				.populate('user_details')
				.exec(function(err1, student_details) {
					if(err) {
						finalJSON.success = false;
						finalJSON.error_message = "Some error occured!";
						functions.sendResponse(res, finalJSON);
					}
					finalJSON.success = true;
					if(student_details.length == 0) {
						finalJSON.error_message = "Student doesnt exists";
					}
					finalJSON.student_details = {class: student_details[0].class, subjects: student_details[0].subjects, name: student_details[0].user_details.name};
					functions.sendResponse(res, finalJSON);
				})					
			}
		}
	})
});

router.post('/updateStudent', function(req, res) {
	var data = req.body;
	var finalJSON = {};
	User.findOneAndUpdate({username: data.username}, {name: data.name}, {upsert: false}, function(err, user_before_updated_doc) {
		if(err) {
			finalJSON.success = false;
			finalJSON.error_message = "Some error occured!";
			functions.sendResponse(res, finalJSON);
		}
		else {
			Student.findOneAndUpdate({user_details: user_before_updated_doc._id}, {class: data.class, subjects: data.subjects}, {upsert: false}, function(err1, student_before_updated_doc) {
				if(err1) {
					finalJSON.success = false;
					finalJSON.error_message = "Some error occured!";
					functions.sendResponse(res, finalJSON);
				}
				else {
					finalJSON.success = true;
					functions.sendResponse(res, finalJSON);					
				}
			});
		}
	})
});

router.post('/deleteStudent', function(req, res) {
	var user_username = req.body.username;
	var finalJSON = {};
	User.findOne({username: user_username}, function(err, model) {
		if(err) {
			finalJSON.success = false;
			finalJSON.error_message = "Some error occured!";
			functions.sendResponse(res, finalJSON);			
		}
		model.remove(function(err) {
			if(err) {
				finalJSON.success = false;
				finalJSON.error_message = "Error in deleting user";
				functions.sendResponse(res, finalJSON);				
			}
			else {
				Student.findOne({user_details: model._id}, function(err1, model1) {
					if(err1) {
						finalJSON.success = false;
						finalJSON.error_message = "Some error occured!";
						functions.sendResponse(res, finalJSON);						
					}
					model1.remove(function(err) {
						if(err) {
							finalJSON.success = false;
							finalJSON.error_message = "Error in deleting student";
							functions.sendResponse(res, finalJSON);							
						}
						else {
							finalJSON.success = true;
							functions.sendResponse(res, finalJSON);							
						}
					})
				})
			}
		})
	});
});

module.exports = router;