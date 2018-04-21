/**
 * This is your main API routing file, defined by the api route in app.js.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer'); //use multer for handling file submissions
var ExampleController = require('../../controllers/exampleController');
var DataService = require('../../controllers/services/dataService');

router.use((req, res, next)=>{
    res.set({
        //allow access from any domain
        'Access-Control-Allow-Origin':'*',
        //allow preflight
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
        'Content-Type':'application/json'
    });
    // if this is a preflight, we're done and can send the response with our headers
    if(req.method == 'OPTIONS'){
        return res.status(200).end();
    }
    next();
})

var app = express();
//file upload name mod and error checking
var upload = multer({
    storage: exampleController.storage,
    fileFilter: exampleController.imgFilter
});

// list REST call
router.get('/', (req, res, next)=>{
    DataService.list()
        .then((itemList)=>{
            res.status(200);
            res.json(itemList);
        })
        .catch((err)=>{
            if(err) {
                console.log(err);
            }
        });
});

// GET - find REST call
router.get('/:id', (req, res, next)=>{
    DataService.find(req.params.id)
        .then((item)=>{
            res.status(200);
            res.json(item);
        })
        .catch((err)=>{
            res.status(404);
            res.end();
        });
});

// POST - create REST call
router.post('/', upload.single('image'), (req, res, next) => {
    var imgpath = "/static/img/" + req.file.filename;
    var exampleObject = {
        "name" : req.body.name,
        "description" : req.body.description,
        "image" : imgpath
    };

    DataService.create(exampleObject)
        .then((item)=>{
            res.status(201);
            res.json(item);
        })
        .catch((err)=>{
            console.log(err);
        });
});

// PUT - update REST call
router.put('/:id', (req, res, next) => {
    let putData = req.body;
    DataService.update(req.params.id, putData)
        .then((updatedItem)=>{
            res.status(200);
            res.json(updatedItem);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404);
            res.end;
        });
});

// DELETE - delete REST call
router.delete('/:id', (req, res, next) => {
    DataService.delete(req.params.id)
        .then((item)=>{
            res.status(200);
            res.json(item);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404);
            res.end;
        });
});

//for flash message error handling
router.use(function(err, req, res, next){
    console.error(err.stack);
    next(err);
});


module.exports = router;