const router = require('express').Router()
// const multer = require('multer');

// var path = require('path');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
//   },
// });
// var upload = multer({ storage: storage });

// import controllers
const { PyCodeRunner } = require('../controllers/code.controller')

// actual routes
router.post('/run', PyCodeRunner)

module.exports = router
