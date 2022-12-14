const User = require('../models/user');
const { body,validationResult } = require('express-validator'); // form data sanitization and validation
const bcrypt = require('bcryptjs'); // hash passwords

// Display User create form on GET.
exports.user_create_get = (req, res, next) => {
    res.render("sign-up", { title: "Sign Up" });
  };

// POST new user sign up
exports.user_create_post = [
    // Validate and sanitize fields.
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("First name must be specified.")
      .isAlphanumeric()
      .withMessage("First name has non-alphanumeric characters."),
    body("lastName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .isAlphanumeric()
      .withMessage("Last name has non-alphanumeric characters."),
    body("email")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isEmail()
    .withMessage("Email is not valid."),
    body("password")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlphanumeric()
    .withMessage("Password has non-alphanumeric characters."),
    body("confirmPassword")
    .trim()
    .custom((value, { req }) => { // check the password and confirm password fields match
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render("sign-up", {
            title: "Sign Up",
            errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid.

        //check if email already exists
        User.countDocuments({ email: req.body.email }, function (err, count) {
            if (count > 0) {
                console.log("User already exists with that email");
                res.render("sign-up", 
                {
                    error: "User already exists with that email",
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                });
                return;
            }
            else {
                
                // If not, create a User object with escaped and trimmed data.
                bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
                    // if err, reload page with error message
                    if (error) {
                        console.log(error);
                        res.redirect("/sign-up", { error: error });
                    }
                    
                    // if no err, create new user
                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hashedPassword,
                        member: false,
                        admin: false,
                    });
                    // save new user
                    newUser.save((err) => {
                        if (err) {
                        return next(err);
                        }
                        // Successful - redirect to home.
                        res.redirect("/");
                    });

                })
            } // end of else
        }); // end of countDocuments
    }
];
