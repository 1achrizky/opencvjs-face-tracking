/**
 * Created by harshitsidhwa on 04/01/19.
 */
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var http  = require('http');
var https = require('https');

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server static assests in root dir
app.use(express.static(__dirname));

// allow cross origin request
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/**
 * Update these to use in prod
 */
const BUCKET_NAME = 'BUCKET_NAME';
const bucketDirname = 'DIR_NAME/';
const SECRET_KEY = 'SECRET_KEY';
const ACCESS_KEY = 'ACCESS_KEY';

aws.config.update({
    secretAccessKey: SECRET_KEY,
    accessKeyId: ACCESS_KEY,
    region: 'us-east-1'
});

const s3 = new aws.S3();

var loaclStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null,  file.originalname);
    }
});

var s3Storage = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            var metaObj = {
                fullname: req.body.studentName,
                id: req.body.studentId
            };
            cb(null, metaObj);
        },
        key: function (req, file, cb) {
            cb(null, bucketDirname + file.originalname)
        }
    })
});

var s3ImageUploader = s3Storage.array('images', 15);
var localImageUploader = multer({storage: loaclStorage}).array('images', 15);

//To server index.html page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/upload', s3ImageUploader, function (req, res) {
    console.log("File Upload Completed For " + req.body.studentId);
    return res.status(200).send('Successfull');
});

http.createServer(app).listen(process.env.PORT || 5000, function () {
    console.log('Server Started');
});