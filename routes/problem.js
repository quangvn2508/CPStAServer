const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./../authenticate');
const Problem = require('./../models/problem')
const Contest = require('./../models/contest');
const User = require('./../models/user');

const problemRouter = express.Router();

problemRouter.use(bodyParser.json());

problemRouter.route('/admin/')
.post((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        Problem.create({owner: user_id, contest: req.body.contestId, name: req.body.name})
        .then((problem) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(problem);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({msg: 'Please log in as admin to use this operation'});
    })
});

problemRouter.route('/:problemId')
.get((req, res, next) => {
    Problem.findById(req.params.problemId)
    .populate('owner', 'nickname')
    .populate('contest', 'startTime testers')
    .then((problem) => {
        console.log(problem);
        var today = new Date();
        var startTime = problem.contest.startTime;
        if (startTime.getTime() <= today.getTime()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(problem);
        }
        else {
            authenticate.verifyLogin(req)
            .then((user_id) => {
                if (problem.owner._id.toString() !== user_id && problem.contest.testers.indexOf(user_id) === -1) {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({msg: "You are not authorised to view this problem yet"});
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(problem);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    })
    .catch((err) => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({msg: "Cannot find the problem with this id"});
    });
});


problemRouter.route('/admin/:problemId')
.get((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        Problem.findById(req.params.problemId)
        .then((problem) => {
            if (problem === null) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "Cannot find problem with this id"});
            }
            else if (problem.owner.toString() !== user_id) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "You are not authorised to modified this problem"});
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(problem);
            }
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in as admin to use this operation'});
    });
})
.put((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        Problem.findById(req.params.problemId)
        .then((problem) => {
            if (problem === null) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "Cannot find the problem"});
            }
            else if (problem.owner.toString() !== user_id) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "You are not authorized to modify this problem"});
            }
            else {
                return problem.updateOne(req.body);
            }
        })
        .then((problem) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(problem);
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in as admin to use this operation'});
    });
})
.delete((req, res, next) => {

});

module.exports = problemRouter;