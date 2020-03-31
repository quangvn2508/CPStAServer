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
        console.log(user_id);
        Problem.create({owner: user_id, contest: req.body.contestId, name: req.body.name})
        .then((problem) => {
            if (problem === null) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({status: 'Unable to create contest'});
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
    })
});

// contestRouter.post('/create', (req, res, next) => {
//     authenticate.verifyLogin(req)
//     .then((user_id) => {
//         req.body['owner'] = user_id;
//         Contest.create(req.body)
//         .then((contest) => {
//             User.findById(user_id)
//             .then((user) => {
//                 user.ownedContests.push(contest._id);
//                 return user.save();
//             })
//             .then((user) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({status: 'Contest create successfully'});
//             })
//             .catch((err) => console.log(err));
//         })
//         .catch((err) => {
//             res.statusCode = 500;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({status: 'Unable to create contest at the moment'});
//         });
//     })
//     .catch((err) => {
//         res.statusCode = 401;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({status: 'Please log in before create a contest'});
//     });
// });


// contestRouter.get('/manage_contests', (req, res, next) => {
//     authenticate.verifyLogin(req)
//     .then((user_id) => {
//         User.findById(user_id, (err, user) => {
//             if (err !== null) {
//                 return next(err);
//             }
//             Contest.find({_id: user.ownedContests})
//                 .select('name createdAt owner')
//                 .populate('owner', 'nickname')
//                 .then((contests) => {
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(contests);
//                 })
//                 .catch((err) => next(err));
//         });
//     })
//     .catch((err) => {
//         res.statusCode = 401;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({status: 'Please log in before create a contest'});
//     });
// });

// contestRouter.route('/:contestId')
// .get((req, res, next) => {
//     authenticate.verifyLogin(req)
//     .then((user_id) => {
//         User.findById(user_id)
//         .then((user) => {
//             if (user.ownedContests.indexOf(req.params.contestId) === -1) {
//                 res.statusCode = 401;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({status: "You are not authorized to modify this contest"});
//             }
//             else {
//                 return Contest.findById(req.params.contestId).populate('testers', 'username');
//             }
//         })
//         .then((contest) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(contest);
//         })
//         .catch((err) => {
//             res.statusCode = 500;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({status: "Error retrieving data for this contest"});
//         })
//     })
//     .catch((err) => {
//         res.statusCode = 401;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({status: 'Please log in before create a contest'});
//     });
// })
// .put((req, res, next) => {
//     authenticate.verifyLogin(req)
//     .then((user_id) => {
//         User.findById(user_id)
//         .select('ownedContests')
//         .then((user) => {
//             console.log(user);
//             if (user.ownedContests.indexOf(req.params.contestId) < 0) {
//                 res.statusCode = 401;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({status: "You are not authorized to modify this contest"});
//             }
//             else {
//                 return Contest.findByIdAndUpdate(req.params.contestId, req.body);
//             }
//         })
//         .then((contest) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(contest);
//         })
//         .catch((err) => next(err));
//     })
//     .catch((err) => {
//         console.log(err);
//         res.statusCode = 401;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({status: 'Please log in before create a contest'});
//     });
// });


module.exports = problemRouter;