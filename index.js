const express = require('express');
const Sequelize  = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const COOKIE_SECRET = 'cookie secret';

const db = new Sequelize('user', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const User = db.define('user', {
    firstname: { type: Sequelize.STRING },
    lastname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING }
});

passport.use(new LocalStrategy((email, password, done) =>{
    User
        .findOne({email})
        .then(function (user) {
            if (!user || user.password !== password){
                return done(null, false, {
                    message: 'Mot de passe invalide'
                });
            }
            return done(null,user)
        })
        .catch(done);
}));
passport.serializeUser((user, cb) => {
    cb(null, user.email);
});
passport.deserializeUser((email, cb) => {
    User.findOne({email})
        .then((user)=>{
            cb(null,user)
        })
});

const app = express();
app.set('view engine', 'pug');
app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); //parser le body a partir du form (telecharcher npm install body-parser --save

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
   res.render('home')
});

app.get('/adduser', (req,res) => {
    res.render('adduser')
});

app.post('/adduser', (req,res) => {

    User
        .sync()
        .then(() => {
            User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password
                }
            )
        })
        .then(()=>{
            res.redirect('/')
        })
});

app.get('/login', (req,res) => {
    res.render('login')
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

User.findOne({ email: 'test' }).then((user) => {
    console.log(user);
});

app.listen(3000);


