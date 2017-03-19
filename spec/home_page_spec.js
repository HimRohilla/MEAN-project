var request = require("request");

var base_url = "http://localhost:3000/";

describe("test home page Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  describe("POST /students/addStudent", function() {
  	it("saves user,student in db", function(done) {
		request.post({
		  headers: {'content-type' : 'application/x-www-form-urlencoded'},
		  url:     'http://localhost:3000/student/addStudent',
		  form: {name: 'abcd', username: 'abcd-9', password: 'abcd',class: 'abcd',subjects: 'abcd'}
		}, function(error, response, body){
		  	expect(body).toBe("{\"success\":true}");
		  	done();
		});
  	});
  });
  describe("POST /students/deleteStudent", function() {
  	it("delete user,student in db", function(done) {
		request.post({
		  headers: {'content-type' : 'application/x-www-form-urlencoded'},
		  url:     'http://localhost:3000/student/deleteStudent',
		  form: {username: 'abcd-9'}
		}, function(error, response, body){
		  	expect(body).toBe("{\"success\":true}");
		  	done();
		});
  	});
  });  
});