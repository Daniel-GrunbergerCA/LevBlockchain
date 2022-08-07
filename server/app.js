var express = require('express');
var cors = require("cors");
var createError = require('http-errors');
var path = require('path'); 
var cookieParser = require('cookie-parser'); // middleware module of express for cookies
var logger = require('morgan');  // middleware module of express for http logs
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var session = require('express-session');
const User = require('./models/users');

var passport = require('passport');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.options('*', cors());
app.set('view engine', 'ejs');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// setup mongo
require('dotenv').config({path:'C:\\Users\\User\\Documents\\ProjectInternet5782\\LevBlockchain\\server\\joss.env'});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Succesfullt connected to db');
})
app.use(
    session({
        secret: "secret123",
        resave: false,
        saveUninitialized: true,
    })
    );
    

app.use(passport.initialize());
app.use(passport.session()); 
app.use(function(req, res, next){
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var profileRouter = require('./routes/profile');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var transactionsRouter = require('./routes/transactions');
var messagesRouter = require('./routes/messages');
var levCoinRouter = require('./routes/levCoin');
const emailSender = require('./routes/email-sender');

const registerSender = require('./routes/register-sender');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/transactions', transactionsRouter);
app.use('/messages', messagesRouter);
app.use('/levCoin', levCoinRouter);
app.use('/email', emailSender);
app.use('/register',registerSender);

app.listen(8081, ()=>{console.log('Listening in 8080...');});
module.exports = app;