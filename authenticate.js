var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, 
        {expiresIn:3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) => {
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyLogin = (req) => {
    var token = opts.jwtFromRequest(req);
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                reject (err);
            } else if (decoded) {
                resolve(decoded._id);
            }
        });
    })
}

// exports.CompareId = function (id, req) {
//     var token = opts.jwtFromRequest(req);
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, config.secretKey, function (err, decoded) {
//             if (err) {
//                 reject (err);
//             } else if (decoded) {
//                 console.log(decoded._id + " ");
//                 console.log(id);
//                 console.log(decoded._id.localeCompare(id) === 0);
//                 if (decoded._id.localeCompare(id) === 0) {
//                     resolve();
//                 }
//                 else {
//                     var err = new Error('You are not authorized to modify this comment');
//                     err.status = 403;
//                     reject(err);
//                 }
//             }
//         });
//     })
// }


// exports.verifyAdmin = (this.verifyUser, (req, res, next) => {
//     var token = opts.jwtFromRequest(req);
//     jwt.verify(token, config.secretKey, function (err, decoded) {
//         if (err) {
//             next(err);
//         } else if (decoded) {
//             User.findById(decoded._id, (err, user) => {
//                 if (user.admin) {
//                     next();
//                 } else {
//                     var err = new Error("You not admin");
//                     err.status = 401;
//                     next(err);
//                 }
//             });
//         }
//     });
// });