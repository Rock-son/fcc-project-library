/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
		chai.request(server)
			.post('/api/books/')
			.send({ title: "Java for Beginners"})
			.end(function(err, res){
				const { _id, title } = JSON.parse(res.text);

				assert.equal(res.status, 200);
				assert.equal(title, "Java for Beginners");
				done();
			});
      });

      test('Test POST /api/books with no title given', function(done) {
		chai.request(server)
			.post('/api/books/')
			.send({ title: ""})
			.end(function(err, res){
				const { error } = JSON.parse(res.text);

				assert.equal(res.status, 400);
				assert.isDefined(error);
				done();
			});
      });

    });


    suite('GET /api/books => array of books', function(){

      test('Test GET /api/books',  function(done){
		chai.request(server)
			.get('/api/books')
			.end(function(err, res){
				assert.equal(res.status, 200);
				assert.isArray(res.body, 'response should be an array');
				assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
				assert.property(res.body[0], 'title', 'Books in array should contain title');
				assert.property(res.body[0], '_id', 'Books in array should contain _id');
				done();
			});
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function(){

      test('Test GET /api/books/[id] with id not in db',  function(done){
		chai.request(server)
			.get('/api/books/1324')
			.end(function(err, res){
				assert.equal(res.status, 400);
				assert.equal(res.text, "no book exists");
				done();
			});
      });

      test('Test GET /api/books/[id] with valid id in db',  function(done){
		chai.request(server)
			.get('/api/books/5bc50d5a25acb6e6180d0fea')
			.end(function(err, res){
				const { _id, title, comments } = JSON.parse(res.text);

				assert.equal(res.status, 200);
				assert.equal(_id, "5bc50d5a25acb6e6180d0fea");
				assert.isDefined(title);
				assert.isArray(comments);
				done();
			});
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){

      test('Test POST /api/books/[id] with comment', function(done){
		chai.request(server)
			.post('/api/books/5bc50d5a25acb6e6180d0fea')
			.send({ comment: "testing"})
			.end(function(err, res){
				const { _id, title, comments } = JSON.parse(res.text);

				assert.equal(res.status, 200);
				assert.isObject(JSON.parse(res.text));
				assert.isArray(comments);
				assert.equal(_id, "5bc50d5a25acb6e6180d0fea");
				assert.include(comments, "testing");
				done();
			});
      });

    });

  });

});
