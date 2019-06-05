const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected …'))
    .catch(err => console.log(err));


//EJS 사용가능케 하기, EJS 홈페이지에서 사용법 확인
app.use(expressLayout);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'sectet',
    resave: true,
    saveUninitialized: true
}));

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));