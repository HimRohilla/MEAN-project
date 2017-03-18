var express = require('express');
var app = express();
var router = express.Router();
var Teacher = require(__base + 'app/models/Teacher');
var User = require(__base + 'app/models/User');
var functions = require(__base + 'app/utility/functions');

router.get('/', function(req, res) {
	res.end();
});

router.get('/getAllTeachers', function(req, res) {
	Teacher.find({}, 'classes_taught user_details')
	.populate('user_details')
	.exec(function(err, teachers) {
		var finalJSON = {};
		if(err) {
			finalJSON.success = false;
			functions.sendResponse(res, finalJSON);
		}
		else {
			finalJSON.success = true;
			finalJSON.count = teachers.length;
			finalJSON.teachers = teachers;
			functions.sendResponse(res, finalJSON);
		}
	})
});

router.post('/addTeacher', function(req, res) {
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
			var newTeacher = Teacher({
				classes_taught: data.classes,
				user_details: newUser._id
			});
			newTeacher.save(function(err) {
				if(err) {
					finalJSON.success = false;
					finalJSON.error_message = 'Teacher not saved, some error occured';
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

router.get('/getTeacherDetails', function(req, res) {
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
				Teacher.find({user_details: user_details_data[0]._id}, 'classes_taught user_details')
				.populate('user_details')
				.exec(function(err1, teacher_details) {
					if(err) {
						finalJSON.success = false;
						finalJSON.error_message = "Some error occured!";
						functions.sendResponse(res, finalJSON);
					}
					finalJSON.success = true;
					if(teacher_details.length == 0) {
						finalJSON.error_message = "Teacher doesnt exists";
					}
					finalJSON.teacher_details = {classes_taught: teacher_details[0].classes_taught, name: teacher_details[0].user_details.name};
					functions.sendResponse(res, finalJSON);
				})					
			}
		}
	})
});

router.post('/updateTeacher', function(req, res) {
	var data = req.body;
	var finalJSON = {};
	User.findOneAndUpdate({username: data.username}, {name: data.name}, {upsert: false}, function(err, user_before_updated_doc) {
		if(err) {
			finalJSON.success = false;
			finalJSON.error_message = "Some error occured!";
			functions.sendResponse(res, finalJSON);
		}
		else {
			Teacher.findOneAndUpdate({user_details: user_before_updated_doc._id}, {classes_taught: data.classes}, {upsert: false}, function(err1, teacher_before_updated_doc) {
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

router.post('/deleteTeacher', function(req, res) {
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
				Teacher.findOne({user_details: model._id}, function(err1, model1) {
					if(err1) {
						finalJSON.success = false;
						finalJSON.error_message = "Some error occured!";
						functions.sendResponse(res, finalJSON);						
					}
					model1.remove(function(err) {
						if(err) {
							finalJSON.success = false;
							finalJSON.error_message = "Error in deleting teacher";
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