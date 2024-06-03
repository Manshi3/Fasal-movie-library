const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { Sequelize, DataTypes } = require('sequelize');

exports.signup = (req, res) => {
    if(req.session.loggedin){
        res.redirect('/');
    }
    res.render('register', { title: 'Sign Up'});
};

exports.signupPost = async (req, res) => {
    const { username, name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { [Sequelize.Op.or]: [{ username }, { email }] } });
        if (existingUser) {
            req.flash('error_msg', 'Username or email already exists');
            return res.redirect('/auth/login');
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = await User.create({ username, name, email, password: hashedPassword });
        req.flash('success_msg', 'Registered successfully');
        res.redirect('/auth/login');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.login = (req, res) => {
    if(req.session.loggedin){
        res.redirect('/');
    }
    res.render('login', { title: 'Log In'});
};

exports.loginPost = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            req.flash('error_msg', 'Username not found');
            return res.redirect('/auth/login');
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            req.flash('error_msg', 'Incorrect password');
            return res.redirect('/auth/login');
        }

        req.session.loggedin = true;
        req.session.userId = user.id;
        req.flash('success_msg', 'You are now logged in');
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};
