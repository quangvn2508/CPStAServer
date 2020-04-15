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

router.get('/admin', (req, res, next) => {
  authenticate.verifyAdmin(req)
  .then((user_id) => {
    res.statusCode = 200;
    res.end();
  })
  .catch((err) => {
    res.statusCode = 401;
    res.end();
  })
});

router.get('/admin/:usernameId', (req, res, next) => {
  authenticate.verifyAdmin(req)
  .then((user_id) => {
    User.findOne({username: req.params.usernameId})
    .select('username')
    .then((user) => {
      if (user === null) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({msg: 'User with this username not exist'});
      }
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
      }
    })
    .catch((err) => next(err));
  })
  .catch((err) => {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.json({msg: 'Please log in as admin to use this operation'});
  })
});


/**
 * Sign up
 */
router.post('/signup', (req, res, next) => {
  // already deal with error regarding registration process
  User.register(new User({username: req.body.username}), req.body.password)
  .then((user) => {
      // if success registering
      user.nickname = req.body.nickname;
      return user.save();
  })
  .then((user) => {
    passport.authenticate('local')(req, res, () => {
      res.statusCode = 200;
      res.end();
    });
  })
  .catch((err) => console.log(err));
});

/**
 * Login
 */
router.post('/login', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if (user === null) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({msg: 'Username not exist'});
    } else next();
  })
  .catch((err) => next(err));
}, 
function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) next(err);
    else if (!user) { 
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({msg: 'Invalid username or password'});
    }
    else {
      req.logIn(user, (err) => {
        if (err) next(err);
        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({token: token, msg: 'Login successful', username: user.username});
      });
    }
  })(req, res, next);
});

module.exports = router;
