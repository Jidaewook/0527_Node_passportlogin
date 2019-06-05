const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


router.get('/', (req, res) => {
    res.render('welcome');
});

//로그인 처리가 되어야만 대시보드로 넘어갈 수 있게 하는 인증함수 반영.
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard');
});

module.exports = router;