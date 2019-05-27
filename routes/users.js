const express = require('express');
const router = express.Router();


//로그인 페이지
router.get('/login', (req, res) => {
    res.render('login');
});

//회원가입 페이지
router.get('/register', (req, res) => {
    res.render('register');
});


module.exports = router;