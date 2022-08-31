const {body, validationResult} = require('express-validator');
const User = require("../models/user");

exports.admin_get = (req, res) => {
    res.render("admin", { user: req.user });
}

exports.admin_post = [
    // Validate and sanitize fields.
    body('username').trim().isLength({ min: 1 }).escape().withMessage('Email name must be specified.'),
    body('password').trim().isLength({ min: 1 }).escape().withMessage('Password must be specified.'),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('admin', { user: req.user, errors: errors.array() });
            return;
        }

          // Data from form is valid and the correct pw enterest to become admin
        if(req.body.password === process.env.ADMIN_SECRET){
            User.findOneAndUpdate({email: req.body.username}, {admin: true}, (err, user) => {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect('/');
            });
        } else {
            res.render('admin', { user: req.user, error: "Invalid password" });
        }
    }
]
