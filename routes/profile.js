const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./../authenticate');
const User = require('./../models/user');

const profileRouter = express.Router();

profileRouter.use(bodyParser.json());

profileRouter.route('/')
.get((req, res, next)  => {
    authenticate.verifyLogin(req)
    .then((user_id) => {
        User.findById(user_id)
        .select("username")
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
        // If not logged in
        res.statusCode = 401;
        res.end();
    });
})
.post((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /profile');
})
.put((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /profile');
})
.delete((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /profile');
});


profileRouter.route('/:username')
.get((req, res, next) => {
    User.findOne({username: req.params.username})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /profile' + req.params.username);
})
.put((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /profile' + req.params.username);
})
.delete((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /profile' + req.params.username);
});


module.exports = profileRouter;