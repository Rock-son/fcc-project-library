"use strict";

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// DEFINE MODEL
const librarySchema = new Schema({

	title: {
		type: String, required: true, trim: true
	},
	comments: {
		type: [ String ], trim: true, default: []
	}
},
{ 
	writeConcern: {
		w: 'majority',
		j: true,
		wtimeout: 1000
	}
}
);

module.exports.LibrarySchema = mongoose.model("LibrarySchema", librarySchema, "library");