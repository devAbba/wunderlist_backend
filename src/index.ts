import express from 'express'
import cookieSession from 'cookie-session'
import session from 'express-session'
import './auth/google'
import tasksRouter from './routes/tasks.route'
import User from './models/users.model'
import usersRouter from './routes/users.route'
import connectDB from './database/mongodb'
import isLoggedIn from './middleware/authMW'
import { uuid } from 'uuidv4'

const cors = require('cors')
const passport = require('passport')

require('dotenv').config()

const PORT = process.env.PORT || 5000
const mongo_url: string | undefined = process.env.DB_URL

const app = express()

connectDB(mongo_url)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

app.use(session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}))

app.use(passport.initialize());
app.use(passport.session());

// use the user model to create the strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', usersRouter)
app.use('/to-do', tasksRouter)

app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "welcome"
    })
})

app.get("/failed", (req, res) => {
    res.send("Failed")
})

app.get("/success", isLoggedIn, async (req: any, res, next: Function) => {
    const userProfile = req.user
    try {
    const userId: any = await User.findOne({email: userProfile.email}).select({_id: 1})
    const userDetails = {
        id: userId._id,
        first_name: userProfile.given_name,
        last_name: userProfile.family_name,
        email: userProfile.email
    }
    res.status(200).json({
        status: true,
        user: userDetails 
    })
    } catch (error){
        next(error)
    }
})

app.get('/auth/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);


app.use((err: Error, req: any, res: any, next: Function) => {
    console.log(err);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
})