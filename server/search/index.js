'use strict';
var express = require('express');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var controller = require('./search.controller');
// var User       = require('../../app/models/user');

var router = express.Router();

router.get      ('/'        , controller.index);
router.get      ('/me'       , controller.index);
router.get      ('/:query'  , controller.show);
router.post     ('/'        , controller.create);
router.put      ('/:query'  , controller.update);
router.patch    ('/:query'  , controller.update);
router.delete   ('/:query'  , controller.destroy);

module.exports = router;
