"use strict";

const { LibrarySchema } = require("./model");

// GET
exports.getBooks = function(req, res, next) {
	LibrarySchema.find({}).exec((err, results) => {
		if (err) { return next(err); }

		const result = results.map(item => ({ _id: item._id, title: item.title, commentcount: item.comments.length || 0 }));
		res.status(200).send(result);
	});
};

exports.getBook = function(req, res, next) {
	var bookid = req.params.id;
	LibrarySchema.findById(bookid).exec((err, results) => {
		if (err) { return next(err); }

		res.status(200).send(results);
	});
};

//POST
exports.postBook = function(req, res, next) {
	const { title } = req.body;

	if (!title) {
		return res.status(400).send({ error: "Request body must not be empty!" })
	}

	const newBook = new LibrarySchema({
		title
	});
	newBook.save(function(err, result) {
		if (err) { return next(err); }

		const { _id, title } = result;
		res.send({
			_id,
			title
		});
	});
};

//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
exports.postComment = function(req, res, next) {
	var bookid = req.params.id;
	var comment = req.body.comment;

	if (!comment) {
		return res.status(400).send({ error: "Comment must not be empty!" })
	}

	LibrarySchema.findById(bookid).exec((err, result) => {
		if (err) { return next(err); }

		result.comments.push(comment);
		result.save((err, obj) => {
			res.status(200).send(result);
		})

	});
};

// DELETE
exports.deleteAllBooks = function(req, res, next) {

	LibrarySchema.deleteMany({}, function(err, doc) {
		if (err) { return next(err); }

		return res.status(200).send("complete delete successful");
	})
};

exports.deleteBook = function(req, res, next) {
	var bookid = req.params.id;
	LibrarySchema.deleteOne({_id: bookid}, function(err, doc) {
		if (err) { return next(err); }

		return res.status(200).send("delete successful");
	})
};
