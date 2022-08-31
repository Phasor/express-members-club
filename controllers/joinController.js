const { body,validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.join_get = (req, res, next) => {
    res.render("join", { title: "Join" });
  };

exports.join_post = [
// Validate and sanitize fields.
body("email")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isEmail()
    .withMessage("Email is not valid."),
body("secretWord")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Must supply a valid secret word."),
// Process request after validation and sanitization.
(req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("join", {
            title: "Join",
            errors: errors.array(),
            });
            return;
        }

        if(req.body.secretWord === process.env.SECRET_WORD) {   
            // find member and update membership to true
            User.findOneAndUpdate({email: req.body.email}, {member: true}, (err, user) => {
                if (err) {
                    res.render("join", {error: err});
                }
                if (user) {
                    console.log("User membership updated to true");
                    res.render('index', {message: "You are now a member!", title: "Home"});
                }
            })
        } else {
            res.render("join", {error: "Invalid secret word"});
        }  
    }
]

