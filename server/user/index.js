'use strict';
var express = require('express');
var controller = require('./user.controller');
// var User       = require('../../app/models/user');

var router = express.Router();

router.get      ('/'        , controller.index);
router.get      ('/'        , controller.me);
router.get      ('/:user_id'  , controller.show);
router.post     ('/'        , controller.create);
router.put      ('/:user_id'  , controller.update);
router.patch    ('/:user_id'  , controller.update);
router.delete   ('/:user_id'  , controller.destroy);

module.exports = router;
