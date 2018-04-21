/**
 * This file is the data service used to communicate with your Mongodb.
 */

var Model = require('../../models/model');

var dataService = {};

// list all items in database
dataService.list = function() {
    return Model.find({})
        .then((itemList)=>{
            return itemList;
        });
};

// get a single element from the database
dataService.find = function(id) {
    return Model.findOne({"_id" : id})
        .then((item)=>{
            return item;
        });
}

// POST - create
dataService.create = function(obj) {
    var item = new Model(obj);
    return item.save();
}

// PUT - update
dataService.update = function(id, data) {
    return Model.findOne({"_id" : id})
        .then((item)=>{
            item.set(data);
            item.save();
            return item;
        });
}

// DELETE - delete
dataService.delete = function(id) {
    return Model.remove({"_id" : id})
        .then((obj)=>{
            return obj;
        });
}

//export dataservice commands
module.exports.list = dataService.list;
module.exports.find = dataService.find;
module.exports.create = dataService.create;
module.exports.update = dataService.update;
module.exports.delete = dataService.delete;