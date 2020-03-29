var express = require('express');
const bodyParser = require('body-parser');
var User = require('./../models/user');
var passport = require('passport');
var authenticate = require('./../authenticate');


var router = express.Router();
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', (req, res, next) => {
  // already deal with error regarding registration process
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {

      // if error occure while try to register
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      // if success registering
      else {
        if (req.body.nickname) {
          user.nickname = req.body.nickname;
        }
        user.save((err, user) => {
          // if error occur when try to save new user to user data base
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return;
          }
          else {
            passport.authenticate('local')(req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: true, status: 'Registration Successful!'});
            });
          }
        });
      }
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err !== null) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
      
    } else if (user === null) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({status: 'Username not exist'});
    } else {
      next();
    }
  })
}, 
function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      next(err); 
    }
    else if (!user) { 
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({status: 'Invalid username or password'});
    }
    else {
      req.logIn(user, function(err) {
        if (err) { 
          next(err); 
        }
        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({token: token, status: 'Login successful'});
      });
    }
  })(req, res, next);
});



router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
