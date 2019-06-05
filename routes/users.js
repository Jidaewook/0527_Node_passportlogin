const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');


const userModel = require('../models/User');



//로그인 페이지
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    //일단 로그인을 등록하면 로컬(세션)에 저장된다.
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//로그아웃
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    req.redirect('/users/login');
});

//회원가입 페이지
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // register에 적는 내용이 터미널에 뜬다. 이것을 파라미터로 보내주면 된다. 
    // console.log(req.body);
    // res.send('hello');

    const {name, email, password, password2} = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    //Check passwords match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    //Check passwords length
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'});
    
    }

    if(errors.length > 0){
        res.render('register', {
           errors,
           name,
           email,
           password,
           password2 
        });
    } else {
        userModel.findOne({email: email})
            .then(user => { 
                if(user){
                    errors.push({msg: 'Email already exists'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new userModel({
                        name,
                        email,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        })
                    });
                }
            })
            .catch(err => console.log(err));
    }


});


module.exports = router;

