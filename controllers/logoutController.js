const { body,validationResult } = require('express-validator'); // form data sanitization and validation
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

exports.logout_get = (req, res, next) => {
    req.logout(function (err) { // logout function from Passport.js
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    };