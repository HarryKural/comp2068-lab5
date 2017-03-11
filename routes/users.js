/**
 * Created by Harshit Sharma on March 10, 2017
 */

let express = require('express');
let router = express.Router();

let Account = require('../models/account');
let passport = require('passport');

// auth check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // user is logged, so call the next function
    }

    res.redirect('/'); // not logged in so redirect to home
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {

    // use mongoose model to query mongodb for all users
    Account.find(function(err, accounts) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }

        // no error so send the users to the index view
        res.render('users', {
            title: 'Users List',
            users: accounts,
            user: req.user
        });
    });
});

module.exports = router;
