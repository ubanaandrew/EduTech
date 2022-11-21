const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
const session = require('express-session');
const userRouter = require('./routes/users');
const indexRouter = require('./routes/index');

require('./config/passport')

dotenv.config();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
    );
    
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/', userRouter);
    
global.dbconn = "";

// Mongoose Connection
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (client, err) => {
        try{
            console.log("Connected to db: " + client)
        } catch(err){
            console.log(err)
        }
    }
);

//  Initialize path for routes
// app.use("/", require("./routes"));


app.listen(process.env.PORT, function(){
    console.log("Port is up and running");
});