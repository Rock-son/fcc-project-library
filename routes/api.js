/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoose = require("mongoose");

const MONGODB_CONNECTION_STRING = process.env.DB;
const db = require("../db/controller");

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, autoIndex: false });
mongoose.set('useFindAndModify', false);


module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res, next){
	  //response will be array of book objects
		db.getBooks(req, res, next);
    })

    .post(function (req, res, next){
      var title = req.body.title;
	  //response will contain new book object including atleast _id and title
	  db.postBook(req, res, next);
    })

    .delete(function(req, res){
	  //if successful response will be 'complete delete successful'
	  db.deleteAllBooks(req, res, next);
    });



  app.route('/api/books/:id')
    .get(function (req, res, next){
		//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
	  var bookid = req.params.id;
	  db.getBook(req, res, next);
    })

    .post(function(req, res, next){
      var bookid = req.params.id;
      var comment = req.body.comment;
	  //json res format same as .get
	  db.postComment(req, res, next);
    })

    .delete(function(req, res, next){
      var bookid = req.params.id;
	  //if successful response will be 'delete successful'
	  db.deleteBook(req, res, next)
    });

};
