const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./../authenticate');
const Contest = require('./../models/contest');
const User = require('./../models/user');

const contestRouter = express.Router();

contestRouter.use(bodyParser.json());

contestRouter.post('/create', (req, res, next) => {
    authenticate.verifyLogin(req)
    .then((user_id) => {
        req.body['owner'] = user_id;
        Contest.create(req.body)
        .then((contest) => {
            User.findById(user_id)
            .then((user) => {
                user.ownedContests.push(contest._id);
                return user.save();
            })
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: 'Contest create successfully'});
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({status: 'Unable to create contest at the moment'});
        });
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in before create a contest'});
    });
});


contestRouter.get('/manage_contests', (req, res, next) => {
    authenticate.verifyLogin(req)
    .then((user_id) => {
        User.findById(user_id, (err, user) => {
            if (err !== null) {
                return next(err);
            }
            Contest.find({_id: user.ownedContests})
                .populate('owner')
                .then((contests) => {
                    var simplifiedData = [];
                    for (var i = 0; i < contests.length; i++) {
                        simplifiedData.push({_id: contests[i]['_id'] ,name: contests[i]['name'], createdAt: contests[i]['createdAt'], nickname: contests[i]['owner']['nickname']});
                    }

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(simplifiedData);
                })
                .catch((err) => next(err));
        });
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in before create a contest'});
    });
});

contestRouter.get('/:contestId', (req, res, next) => {
    authenticate.verifyLogin(req)
    .then((user_id) => {
        User.findById(user_id)
        .then((user) => {
            if (user.ownedContests.indexOf(req.params.contestId) === -1) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "You are not authorized to modify this contest"});
            }
            else {
                return Contest.findById(req.params.contestId);
            }
        })
        .then((contest) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(contest);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({status: "Error retrieving data for this contest"});
        })
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in before create a contest'});
    });
});


module.exports = contestRouter;