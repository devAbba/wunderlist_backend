import express from 'express'
import User from '../models/users.model'
import { IUser } from '../types'

const passport = require('passport')

const usersRouter = express.Router()

// handles the signup request for new users
usersRouter.post('/signup', (req, res) => {
    const user = req.body;
    User.register(new User({ email: user.email, first_name: user.first_name, last_name: user.last_name }), user.password, (err: Error, user: IUser) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                const user = req.user
                res.status(200).json({
                    status: true,
                    user: user
                })
            });
        }
    });
});


// handles the login request for existing users
usersRouter.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.status(200).json({
        status: true,
        user: req.user
    })
});

// handles the logout request
usersRouter.get('/logout', (req: any, res: any) => {
    // req.session = null;
    req.logout();
    res.status(200).json({
        status: true,
        message: 'logged out'
    })
});

export default usersRouter