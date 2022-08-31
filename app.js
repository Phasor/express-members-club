var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var createMessageRouter = require('./routes/createMessage');
var adminRouter = require('./routes/admin');

var app = express();

// setup mongoose
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI; 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// enable middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Next 3 functions are needed by Passport.js for authentication. We don't call them directly
passport.use( 
    new LocalStrategy((username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
 
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" })
            }
          })
    })
}));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

app.use(session({ secret: "testtstte", resave: false, saveUninitialized: true }));  
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

/*
If you insert this code somewhere between where you instantiate the passport middleware 
and before you render your views, you will have access to the currentUser variable in all 
of your views, and you won’t have to manually pass it into all of the controllers in 
which you need it.
*/
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

// use our routes
app.use('/', indexRouter);
app.use('/sign-up', usersRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/create-message', createMessageRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
