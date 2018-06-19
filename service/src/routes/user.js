var express = require('express');
var router = express.Router();
var UserService = require('../services/user');

/** Sign Up */
router.post('/create', function(req, res, next){
    const newUser = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        firstName: '',
        lastName: '',
        avatar: '',
        registrationIP: UserService.getUserIP(req),
        registrationDate: Date.now(),
        lastLoginIP: UserService.getUserIP(req),
        lastLoginDate: Date.now(),
        roles: ['user'],
    };
    UserService.saveNewUser(newUser).then((response) => {
        res.send(response);
    });
});
/** Sign In */
router.post('/login', function(req, res, next){
    UserService.getUserFromDB(req.body).then((response) => {
        res.send(response);
    })
});
/** Sign Up form */
router.get('/create', function(req, res, next){
    res.render('../views/signup.pug');
});
/** Sign In form */
router.get('/login', function(req, res, next) {
    res.render('../views/signin.pug');
});

module.exports = router;
