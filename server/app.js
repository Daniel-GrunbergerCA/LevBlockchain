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
const http = require('http');
var passport = require('passport');
var app = express();
const { Server } = require("socket.io");
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
require('dotenv').config();

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

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
  }

var profileRouter = require('./routes/profile');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var transactionsRouter = require('./routes/transactions');
var messagesRouter = require('./routes/messages');
var levCoinRouter = require('./routes/levCoin');
var notificationsRouter = require('./routes/notifications');
var logoutRouter = require('./routes/logout');
var feedbacksRouter = require('./routes/feedbacks');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/feedbacks',  feedbacksRouter);
app.use('/users', isLoggedIn, usersRouter);
app.use('/profile', isLoggedIn, profileRouter);
app.use('/transactions', isLoggedIn, transactionsRouter);
app.use('/messages', isLoggedIn, messagesRouter);
app.use('/levCoin', isLoggedIn, levCoinRouter);
app.use('/notifications', isLoggedIn, notificationsRouter);
app.use('/logout', isLoggedIn, logoutRouter);


var server = app.listen(8081, ()=>{console.log('listening in 8080...');});
// var io = require('socket.io')(server, 
//     {
//         cors: {
//             origin: '*',
//           }
//     });
// app.set('socketio', io);
// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });
// socket.emit('warningAlert', "blue");

module.exports = app;