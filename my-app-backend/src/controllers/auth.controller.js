/**
 * Controller for the authentication endpoints
 */
const db = require("../models/index.js");
var User = db.user;

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config/auth.config'); // get config file

// Login
exports.login = (req, res) => {

    User.findOne({ where: { username: req.body.username } })
        .then(function (user, err) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');

            // check if the password is valid
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).send({ auth: true, token: token })

        });
};


// Logout
exports.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
};

// Create new user
exports.register = (req, res) => {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword
    }).then(function (user, err) {
        if (err) return res.status(500).send("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token })

    })

};

// Retrieve current user's info
exports.me = (req, res, next) => {

    User.findByPk(req.userId, { attributes: { exclude: ['password'] } })
        .then(function (user, err) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send(user)
        });
};


