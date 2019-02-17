const express = require('express');
let router = express.Router();
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const jwt  = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema;
const UserSchema = new Schema({ facebookId: Number});
UserSchema.plugin(findOrCreate);
const User = mongoose.model('User', UserSchema);

const UserArr = [
    {
        email: 'email1',
        username: 'username1',
        password: 'password1',
    },
    {
        email: 'email2',
        username: 'username2',
        password: 'password2',
    },
    {
        email: 'email3',
        username: 'username3',
        password: 'password3',
    }
];

const schema = {
    "type": "object",
    "required": ["email", "username", "password"],
    "properties": {
        "email": {
            "type": "string",
        },
        "username": {
            "type": "string",
        },
        "password": {
            "type": "string",
            "minLength": 3,
        }
    }
};
let validate = ajv.compile(schema);

passport.use(new LocalStrategy(
    function(username, password, done) {
        const obj = UserArr.find(item => item.username === username && item.password === password);
        if (obj) {
            done(null, obj)
        } else {
            done(null, false, 'Bad username/password combination.')
        }
    }
));

passport.use(new FacebookStrategy({
        clientID: 1039487966235773,
        clientSecret: '7bb14f8d06ea6d1c3dbcb636d7ab4d19',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            console.log('A new uzer from "%s" was inserted', user.facebookId);
            return cb(err, user);
        });
    }
));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));

router.get('/', passport.authenticate('local', {session: false}), (req, res, next) => {
    let valid = validate(req.query);
    if (valid) {
        res.status(200).json({
            message: "OK",
            data: {
                "user": {
                    email: req.query.email,
                    username: req.query.username,
                }
            },
            token: jwt.sign( {
                email: req.query.email,
                username: req.query.username,
            }, 'secret', { expiresIn: 10 })
        });
    } else {
        res.status(404).json({
            message: "Not Found."
        });
    }
});

module.exports = router;
