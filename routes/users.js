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

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('hello');
});


router.get('/dashboard', (req, res) =>{
    res.render('dashboard');
});



module.exports = router;