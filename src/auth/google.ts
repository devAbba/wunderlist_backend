import { IUser } from '../types'
import User from '../models/users.model'

const passport = require("passport")
require("dotenv").config()
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user: IUser, done: any) {
    done(null, user);
});

passport.deserializeUser(function(user: IUser, done: any) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    async function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
       
        let user = await User.findOne({email: profile.email})
        if (!user){
            const userToSave = new User({
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email
            })
            await userToSave.save()
        }
        return done(null, profile);
    }
));