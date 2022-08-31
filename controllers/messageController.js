const { body,validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

exports.message_get = (req, res) => {
    res.render("createMessage", { title: "Create Message" });
}

exports.message_post = [   
    body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must not be empty."),
    body("content")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must not be empty."),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("createMessage", {
            errors: errors.array(),
            });
            return;
        }

        const message = new Post({
            title: req.body.title,
            author: req.user._id,
            content: req.body.content,
            date: Date.now()
        });

        message.save((err) => {
            if (err) { return next(err); }
            // Successful - redirect to home. SHOULD BE POST URL!!!
            res.redirect("/");
        });
    }
]
