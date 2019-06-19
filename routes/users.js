const express = require('express')
const router = require('express-promise-router')()
const UsersController = require('../controllers/users')
const {validateBody,schemas} = require('../helpers/routeHelpers')
const passport = require('passport');
const passportConf = require('../passport');

router.route('/signup')
    .post(validateBody(schemas.authSchema),UsersController.signUp)

router.route('/signin')
    .post(validateBody(schemas.authSchema),passport.authenticate('local',{session:false}),UsersController.signIn)

router.route('/secret')
    .get(passport.authenticate('jwt',{session:false}),UsersController.secret)

module.exports = router