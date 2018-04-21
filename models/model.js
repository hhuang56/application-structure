/**
 * This file defines the model that mirrors your Mongodb data.
 */

var mongoose = require('mongoose');

//get access to Schema constructor
var Schema = mongoose.Schema;

//an example schema
var exampleSchema = mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String, required:false},
    image: {type: String, required:false},
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

exampleSchema.pre('save', function(next){
    if(!this.createdAt) {
        this.createdAt = new Date();
    } else {
        this.updatedAt = new Date();
    }
    next();
});

//export the model
module.exports = mongoose.model('ExampleSchema', exampleSchema);