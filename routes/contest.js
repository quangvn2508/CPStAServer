const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./../authenticate');
const Contest = require('./../models/contest');
const User = require('./../models/user');

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
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /admin/');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /admin/');
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
                res.json({status: "You are not authorized to modify this contest"});
            }
            else {
                return Contest.findById(req.params.contestId).populate('testers', 'username').populate('problems','name');
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
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Please log in as admin to use this operation'});
    });
})
.put((req, res, next) => {
    authenticate.verifyAdmin(req)
    .then((user_id) => {
        User.findById(user_id)
        .select('ownedContests')
        .then((user) => {
            console.log(user);
            if (user.ownedContests.indexOf(req.params.contestId) < 0) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: "You are not authorized to modify this contest"});
            }
            else {
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