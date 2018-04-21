/**
 * This controller is only used for file upload processing.
 */
var multer = require('multer');

//change name of image stored
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

//check if file is an image
const imgFilter = function(req, file, cb) {
    if(file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    } else {
        cb(new Error("imgFileTypeRequired"), false);
    }
};

module.exports.storage = storage;
module.exports.imgFilter = imgFilter;