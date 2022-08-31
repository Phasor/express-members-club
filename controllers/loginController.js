const { body,validationResult } = require('express-validator'); // form data sanitization and validation
const passport = require('passport');

exports.login_get = (req, res) => {
    // If user is already logged in, redirect them to the homepage
    if (res.locals.currentUser) return res.redirect("/"); 
    res.render("login", { title: "Login" });
  };

exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up"
});



// exports.login_post = [
//     body("email")
//     .trim()
//     .isLength({ min: 1 })
//     .escape()
//     .isEmail()
//     .withMessage("Must supply a valid email address."),
//     body("password")
//     .trim()
//     .isLength({ min: 1 })
//     .escape()
//     .withMessage("Must supply a valid password."),

//     // Process request after validation and sanitization.
//     (req, res, next) => {
//         const errors = validationResult(req);

//         // there are errors
//         if (!errors.isEmpty()) {
//             res.render("login", {
//             title: "Login",
//             errors: errors.array(),
//             });
//             return;
//         }
//       // there are no errors  
//         passport.authenticate('local', { failureRedirect: '/login' })
//         (req, res, function () {
//             res.redirect('/');
//         });
//     }
// ];