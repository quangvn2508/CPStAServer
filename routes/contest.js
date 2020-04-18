const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./../authenticate');
const Contest = require('./../models/contest');
const User = require('./../models/user');
const Problem = require('./../models/problem');

const contestRouter = express.Router();

contestRouter.use(bodyParser.json());

contestRouter.route('/')
.get((req, res, next) => {

})
.post((req, res, next) => {

})
.put((req, res, next) => {

})
.delete((req, res, next) => {

});

contestRouter.route('/admin')
.get((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        User.findById(user_id)
        .then((user) => {
            return Contest.find({_id: user.ownedContests})
                        .select('name createdAt owner')
                        .populate('owner', 'nickname');
        })
        .then((contests) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(contests);
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({msg: 'Please log in as admin to use this operation'});
    });
})
.post((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        // add owner to json
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
                res.json({msg: 'Contest create successfully'});
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in as admin to use this operation'});
    });
});

contestRouter.route('/:contestId')
.get((req, res, next) => {
    Contest.findById(req.params.contestId)
    .select('description rule name startTime endTime owner problems score')
    .populate('problems', 'name')
    .then((contest) => {
        // Remove problems field
        var problems = contest.problems;
        contest.problems = [];

        var today = new Date();
        var startTime = contest.startTime;
        if (startTime.getTime() > today.getTime()) {
            authenticate.verifyLogin(req)
            .then((user_id) => {
                if (contest.owner.toString() === user_id || contest.testers.indexOf(user_id) !== -1) {
                    contest.problems = problems;
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            contest.problems = problems;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(contest);
    })
    .catch((err) => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({msg: "Cannot find the contest with this id"});
    });
});

contestRouter.route('/admin/:contestId')
.get((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        User.findById(user_id)
        .then((user) => {
            if (user.ownedContests.indexOf(req.params.contestId) === -1) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({msg: "You are not authorized to modify this contest"});
            }
            else {
                return Contest.findById(req.params.contestId)
                .populate('testers', 'username')
                .populate('problems', 'name');
            }
        })
        .then((contest) => {
            
            console.log(contest);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(contest);
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({msg: 'Please log in as admin to use this operation'});
    });
})
.put((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        User.findById(user_id)
        .select('ownedContests')
        .then((user) => {
            if (user.ownedContests.indexOf(req.params.contestId) < 0) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({msg: "You are not authorized to modify this contest"});
            }
            else {
                console.log(req.body);
                return Contest.findByIdAndUpdate(req.params.contestId, req.body);
            }
        })
        .then((contest) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(contest);
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in as admin to use this operation'});
    });
});


module.exports = contestRouter;